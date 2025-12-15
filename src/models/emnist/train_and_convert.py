import os
import string

import tensorflow as tf
from tensorflow.keras import layers, models
import tensorflowjs as tfjs
import tf2onnx
import tensorflow_datasets as tfds

print("TensorFlow version:", tf.__version__)
print("TFDS version:", tfds.__version__)

NUM_CLASSES = 62
BATCH_SIZE = 128
EPOCHS = 25

EMNIST_LABELS = (
    list(string.digits) +
    list(string.ascii_uppercase) +
    list(string.ascii_lowercase)
)

def label_to_char(label: int) -> str:
    return EMNIST_LABELS[label]

DATA_DIR = os.environ.get("TFDS_DATA_DIR", "/tfds")
os.makedirs(DATA_DIR, exist_ok=True)


builder = tfds.builder("emnist/byclass", data_dir=DATA_DIR)

builder.info.set_file_format(
    file_format="tfrecord",
    override=True,
    override_if_initialized=True,
)

builder.download_and_prepare()

ds_train = builder.as_dataset(
    split="train",
    as_supervised=True,
    shuffle_files=True,
)

ds_test = builder.as_dataset(
    split="test",
    as_supervised=True,
    shuffle_files=False,
)

def preprocess(image, label):
    image = tf.cast(image, tf.float32) / 255.0
    image = tf.image.rot90(image, k=3)
    image = tf.image.flip_left_right(image)
    if tf.rank(image) == 2:
        image = tf.expand_dims(image, -1)
    return image, label

ds_train = (
    ds_train
    .map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    .shuffle(10000)
    .batch(BATCH_SIZE)
    .prefetch(tf.data.AUTOTUNE)
)

ds_test = (
    ds_test
    .map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    .batch(BATCH_SIZE)
    .prefetch(tf.data.AUTOTUNE)
)


model = models.Sequential([
    layers.Input(shape=(28, 28, 1), name="input"),

    layers.Conv2D(32, 3, padding="same"),
    layers.BatchNormalization(),
    layers.Activation("relu"),
    layers.Conv2D(32, 3, padding="same"),
    layers.BatchNormalization(),
    layers.Activation("relu"),
    layers.MaxPooling2D(),
    layers.Dropout(0.25),

    layers.Conv2D(64, 3, padding="same"),
    layers.BatchNormalization(),
    layers.Activation("relu"),
    layers.Conv2D(64, 3, padding="same"),
    layers.BatchNormalization(),
    layers.Activation("relu"),
    layers.MaxPooling2D(),
    layers.Dropout(0.25),

    layers.Flatten(),
    layers.Dense(256),
    layers.BatchNormalization(),
    layers.Activation("relu"),
    layers.Dropout(0.5),

    layers.Dense(NUM_CLASSES, activation="softmax"),
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

callbacks = [
    tf.keras.callbacks.ReduceLROnPlateau(
        monitor="val_loss", factor=0.5, patience=2, min_lr=1e-5, verbose=1
    ),
    tf.keras.callbacks.EarlyStopping(
        monitor="val_loss", patience=5, restore_best_weights=True, verbose=1
    ),
]

model.fit(ds_train, epochs=EPOCHS, validation_data=ds_test, callbacks=callbacks)

test_loss, test_acc = model.evaluate(ds_test, verbose=0)
print(f"Test accuracy: {test_acc:.4f}")

# Export
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, "../../../"))

TFJS_DIR   = os.path.join(PROJECT_ROOT, "public", "models", "tensorflowjs", "emnist")
ONXX_DIR   = os.path.join(PROJECT_ROOT, "public", "models", "onxx", "emnist")
LABELS_DIR = os.path.join(PROJECT_ROOT, "public", "labels", "emnist")

os.makedirs(TFJS_DIR, exist_ok=True)
os.makedirs(ONXX_DIR, exist_ok=True)
os.makedirs(LABELS_DIR, exist_ok=True)

tfjs.converters.save_keras_model(model, TFJS_DIR)
print("Saved TFJS:", TFJS_DIR)

onnx_path = os.path.join(ONXX_DIR, "model.onnx")
spec = (tf.TensorSpec((None, 28, 28, 1), tf.float32, name="input"),)
model_proto, _ = tf2onnx.convert.from_keras(model, input_signature=spec, opset=13)
with open(onnx_path, "wb") as f:
    f.write(model_proto.SerializeToString())
print("Saved ONNX:", onnx_path)

labels_path = os.path.join(LABELS_DIR, "labels.txt")
with open(labels_path, "w", encoding="utf-8") as f:
    for ch in EMNIST_LABELS:
        f.write(ch + "\n")
print("Saved labels:", labels_path)