import { useRef, useState } from 'react'
import { Canvas } from '@/components/canvas/canvas'
import { TENSORFLOW_BACKENDS } from '@/const/tensorFlowBackend'

import { TensorFlowBackendSelector } from '../tensorFlowBackend/tensorFlowBackendSelector'
import { useTensorflowDigitModel } from '@/hooks/tensorflow/useTensorflowDigitModel'
import type { TensorFlowBackendType } from '@/types/tensorFlowBackend'

export const DigitPlayground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [backend, setBackend] = useState<TensorFlowBackendType>(TENSORFLOW_BACKENDS.WEBGL)

  const { backendReady, loadingModel, predicting, prediction, predictFromCanvas } =
    useTensorflowDigitModel(backend)

  const handlePredictClick = async () => {
    await predictFromCanvas(canvasRef.current)
  }

  return (
    <div className="space-y-4">
      <TensorFlowBackendSelector
        backend={backend}
        onChange={setBackend}
        disabled={predicting || loadingModel}
        className="mt-2"
        label="TF backend"
      />

      {loadingModel && (
        <div className="text-xs text-muted-foreground">Loading TensorFlow model...</div>
      )}

      <Canvas
        canvasRefExternal={canvasRef}
        className="mt-2"
        background="#ffffff"
        initialColor="#111827"
        initialSize={8}
        height={520}
      />

      <div className="mt-3 flex items-center gap-4">
        <button
          disabled={!backendReady || !canvasRef.current || loadingModel || predicting}
          onClick={handlePredictClick}
          className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50"
        >
          {loadingModel ? 'Loading model...' : predicting ? 'Running...' : 'Recognize digit'}
        </button>

        {prediction !== null && (
          <span className="text-sm">
            TF model predicts: <span className="font-semibold">{prediction}</span>
          </span>
        )}

        {!loadingModel && backendReady && prediction === null && (
          <span className="text-xs text-muted-foreground">
            Draw a digit and click "Recognize digit".
          </span>
        )}
      </div>
    </div>
  )
}
