FROM python:3.10-slim

ENV TF_USE_LEGACY_KERAS=1
ENV TFDS_DATA_DIR=/tfds

ENV GOOGLE_APPLICATION_CREDENTIALS=""
ENV NO_GCE_CHECK=true

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    "tensorflow==2.15.0" \
    "tensorflowjs==4.20.0" \
    "tf2onnx==1.16.1" \
    "tensorflow-datasets==4.9.7"

COPY train_and_convert.py .

CMD ["python", "train_and_convert.py"]
