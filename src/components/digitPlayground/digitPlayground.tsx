import { useRef, useState } from 'react'
import { Canvas } from '@/components/canvas/canvas'
import type { AvaibleTensorflowBackendType, AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import { WasmOnlySupport } from '../badges/WasmOnlySupport'
import { useTensorflowDigitModel } from '@/hooks/tensorflow/useTensorflowDigitModel'
import { useOnnxDigitModel } from '@/hooks/onxx/useOnnxDigitModel'
import { useWebDnnDigitModel } from '@/hooks/webDnn/useWebDnnDigitModel'
import { AvaibleTensorflowBackendSelector } from '../shared/avaibleTensorflowBackendSelector'
import { AVAIBLE_WEBDNN_BACKENDS } from '@/const/avaibleWebdnnBackends'
import { AVAIBLE_TENSORFLOW_BACKENDS } from '@/const/avaibleTensorflowBackends'
import { AvaibleWebdnnBackendSelector } from '../shared/avaibleWebdnnBackendSelector copy'

export const DigitPlayground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [tensorflowbackend, setTensorflowBackend] = useState<AvaibleTensorflowBackendType>(
    AVAIBLE_TENSORFLOW_BACKENDS.CPU
  )

  const [webdnnBackend, setWebdnnBackend] = useState<AvaibleWebdnnBackendType>(
    AVAIBLE_WEBDNN_BACKENDS.CPU
  )

  const {
    ready: tfReady,
    loadingModel: tfLoading,
    predicting: tfPredicting,
    prediction: tfPrediction,
    predictFromCanvas: tfPredictFromCanvas,
  } = useTensorflowDigitModel(tensorflowbackend)

  const {
    ready: webdnnReady,
    loadingModel: webdnnLoading,
    predicting: webdnnPredicting,
    prediction: webdnnPrediction,
    predictFromCanvas: webdnnPredictFromCanvas,
  } = useWebDnnDigitModel(webdnnBackend)

  const {
    ready: onnxReady,
    loadingModel: onnxLoading,
    predicting: onnxPredicting,
    prediction: onnxPrediction,
    predictFromCanvas: onnxPredictFromCanvas,
  } = useOnnxDigitModel()

  const [runningAll, setRunningAll] = useState(false)

  const handlePredictClick = async () => {
    if (!canvasRef.current) return

    setRunningAll(true)
    try {
      await tfPredictFromCanvas(canvasRef.current)
      await onnxPredictFromCanvas(canvasRef.current)
      await webdnnPredictFromCanvas(canvasRef.current)
    } finally {
      setRunningAll(false)
    }
  }

  const isButtonDisabled =
    !canvasRef.current ||
    !tfReady ||
    !onnxReady ||
    !webdnnReady ||
    tfLoading ||
    onnxLoading ||
    webdnnLoading ||
    tfPredicting ||
    onnxPredicting ||
    webdnnPredicting ||
    runningAll

  let buttonLabel: string
  if (tfLoading || onnxLoading || webdnnLoading) {
    buttonLabel = 'Loading models...'
  } else if (runningAll || tfPredicting || onnxPredicting || webdnnPredicting) {
    buttonLabel = 'Running...'
  } else {
    buttonLabel = 'Recognize digit (TF + ONNX + WebDNN)'
  }

  const allPredicted = tfPrediction !== null && onnxPrediction !== null && webdnnPrediction !== null

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Digit playground</h1>
        <p className="text-sm text-muted-foreground">
          Draw a digit on the canvas, then compare predictions from TensorFlow, ONNX and WebDNN
          models in the browser.
        </p>
      </header>

      <section className="rounded-xl border bg-background/60 p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <AvaibleTensorflowBackendSelector
              backend={tensorflowbackend}
              onChange={setTensorflowBackend}
              disabled={tfPredicting || runningAll || tfLoading}
              className="min-w-[220px]"
            />
            <AvaibleWebdnnBackendSelector
              backend={webdnnBackend}
              onChange={setWebdnnBackend}
              disabled={tfPredicting || runningAll || tfLoading}
              className="min-w-[220px]"
            />
            <WasmOnlySupport />
          </div>

          {(tfLoading || onnxLoading || webdnnLoading) && (
            <div className="text-xs text-muted-foreground">
              {tfLoading && onnxLoading && webdnnLoading
                ? 'Loading TensorFlow, ONNX and WebDNN models...'
                : tfLoading
                  ? 'Loading TensorFlow model...'
                  : onnxLoading
                    ? 'Loading ONNX model...'
                    : 'Loading WebDNN model...'}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl border bg-background/60 p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <button
              disabled={isButtonDisabled}
              onClick={handlePredictClick}
              className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition
                         hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              {buttonLabel}
            </button>

            {!allPredicted &&
              !tfLoading &&
              !onnxLoading &&
              !webdnnLoading &&
              tfReady &&
              onnxReady &&
              webdnnReady && (
                <span className="text-xs text-muted-foreground">
                  Draw a digit and click &quot;Recognize digit (TF + ONNX + WebDNN)&quot; to run
                  predictions.
                </span>
              )}
          </div>

          <div className="min-h-[40px] text-sm md:text-right">
            {allPredicted && (
              <div className="flex flex-col gap-1 md:items-end">
                <span>
                  TF model predicts: <span className="font-semibold">{tfPrediction}</span>
                </span>
                <span>
                  ONNX model predicts: <span className="font-semibold">{onnxPrediction}</span>
                </span>
                <span>
                  WebDNN model predicts: <span className="font-semibold">{webdnnPrediction}</span>
                </span>
              </div>
            )}

            {!allPredicted && (tfLoading || onnxLoading || webdnnLoading) && (
              <span className="text-xs text-muted-foreground">
                Models are loading, please wait a moment…
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-background/60 p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Drawing canvas</h2>
        <div className="overflow-hidden rounded-lg bg-card">
          <Canvas
            canvasRefExternal={canvasRef}
            className="mt-0"
            background="#ffffff"
            initialColor="#111827"
            initialSize={8}
            height={520}
          />
        </div>
      </section>
    </div>
  )
}
