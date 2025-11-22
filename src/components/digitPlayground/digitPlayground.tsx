import { useRef, useState } from 'react'
import { Canvas } from '@/components/canvas/canvas'
import { TENSORFLOW_BACKENDS } from '@/const/tensorFlowBackend'
import type { TensorFlowBackendType } from '@/types/tensorFlowBackend'

import { TensorFlowBackendSelector } from '../tensorFlowBackend/tensorFlowBackendSelector'
import { useTensorflowDigitModel } from '@/hooks/tensorflow/useTensorflowDigitModel'
import { useOnnxDigitModel } from '@/hooks/onxx/useOnnxDigitModel'
import { WasmOnlySupport } from '../badges/WasmOnlySupport'

export const DigitPlayground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [backend, setBackend] = useState<TensorFlowBackendType>(TENSORFLOW_BACKENDS.WEBGL)

  const {
    ready: tfReady,
    loadingModel: tfLoading,
    predicting: tfPredicting,
    prediction: tfPrediction,
    predictFromCanvas: tfPredictFromCanvas,
  } = useTensorflowDigitModel(backend)

  const {
    ready: onnxReady,
    loadingModel: onnxLoading,
    predicting: onnxPredicting,
    prediction: onnxPrediction,
    predictFromCanvas: onnxPredictFromCanvas,
  } = useOnnxDigitModel()

  const [runningBoth, setRunningBoth] = useState(false)

  const handlePredictClick = async () => {
    if (!canvasRef.current) return

    setRunningBoth(true)
    try {
      await tfPredictFromCanvas(canvasRef.current)
      await onnxPredictFromCanvas(canvasRef.current)
    } finally {
      setRunningBoth(false)
    }
  }

  const isButtonDisabled =
    !canvasRef.current ||
    !tfReady ||
    !onnxReady ||
    tfLoading ||
    onnxLoading ||
    tfPredicting ||
    onnxPredicting ||
    runningBoth

  let buttonLabel: string
  if (tfLoading || onnxLoading) {
    buttonLabel = 'Loading models...'
  } else if (runningBoth || tfPredicting || onnxPredicting) {
    buttonLabel = 'Running...'
  } else {
    buttonLabel = 'Recognize digit (TF + ONNX)'
  }

  const bothPredicted = tfPrediction !== null && onnxPrediction !== null

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Digit playground</h1>
        <p className="text-sm text-muted-foreground">
          Draw a digit on the canvas, then compare predictions from TensorFlow and ONNX models in
          the browser.
        </p>
      </header>

      <section className="rounded-xl border bg-background/60 p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <TensorFlowBackendSelector
              backend={backend}
              onChange={setBackend}
              disabled={tfPredicting || runningBoth || tfLoading}
              className="min-w-[220px]"
              label="TensorFlow backend"
            />
            <WasmOnlySupport />
          </div>

          {(tfLoading || onnxLoading) && (
            <div className="text-xs text-muted-foreground">
              {tfLoading && onnxLoading
                ? 'Loading TensorFlow and ONNX models...'
                : tfLoading
                  ? 'Loading TensorFlow model...'
                  : 'Loading ONNX model...'}
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

            {!bothPredicted && !tfLoading && !onnxLoading && tfReady && onnxReady && (
              <span className="text-xs text-muted-foreground">
                Draw a digit and click &quot;Recognize digit (TF + ONNX)&quot; to run predictions.
              </span>
            )}
          </div>

          <div className="min-h-[40px] text-sm md:text-right">
            {bothPredicted && (
              <div className="flex flex-col gap-1 md:items-end">
                <span>
                  TF model predicts: <span className="font-semibold">{tfPrediction}</span>
                </span>
                <span>
                  ONNX model predicts: <span className="font-semibold">{onnxPrediction}</span>
                </span>
              </div>
            )}

            {!bothPredicted && (tfLoading || onnxLoading) && (
              <span className="text-xs text-muted-foreground">
                Models are loading, please wait a moment…
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-background/60 p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Drawing canvas</h2>
        <div className="overflow-hidden rounded-lg border bg-card">
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
