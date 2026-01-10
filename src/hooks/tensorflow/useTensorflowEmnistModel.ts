import { useMemo, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useTensorflowModelRunner } from './useTensorflowModelRunner'
import type { AvaibleTensorflowBackendType } from '@/types/avaibleBackend'
import type { EmnistModelResult, PredictFromCanvasResult } from '@/types/emnistModelResult'
import { useLabels } from '../useLabels'

export const useTensorflowEmnistModel = (
  backend: AvaibleTensorflowBackendType
): EmnistModelResult => {
  const options = useMemo(
    () => ({ backend, modelUrl: '/models/tensorflowjs/emnist/model.json' }),
    [backend]
  )

  const { model, backendReady, loadingModel } = useTensorflowModelRunner(options)

  const { data: labels } = useLabels('/labels/emnist/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)

  const predictFromCanvas = async (
    canvas: HTMLCanvasElement | null
  ): Promise<PredictFromCanvasResult> => {
    const tTotal0 = performance.now()

    if (!model || !canvas || (labels?.length ?? 0) === 0) {
      const res: PredictFromCanvasResult = {
        prediction: null,
        hasError: true,
        errorMessage: 'Model not ready',
        timeProcess: {
          preprocessMs: 0,
          inferenceMs: 0,
          postprocessMs: 0,
          totalMs: performance.now() - tTotal0,
        },
      }
      setPrediction(null)
      return res
    }

    setPredicting(true)

    try {
      // -------- preprocess (canvas -> tensor) --------
      const tPre0 = performance.now()

      const processed = preprocessDigitCanvas(canvas)
      if (!processed) {
        const res: PredictFromCanvasResult = {
          prediction: null,
          hasError: true,
          errorMessage: 'Empty drawing',
          timeProcess: {
            preprocessMs: performance.now() - tPre0,
            inferenceMs: 0,
            postprocessMs: 0,
            totalMs: performance.now() - tTotal0,
          },
        }
        setPrediction(null)
        return res
      }

      const { data, width, height } = processed

      // Nie używaj tf.tidy do obiektu, który chcesz ręcznie dispose'ować.
      const input = tf.tensor4d(data, [1, height, width, 1], 'float32')

      const preprocessMs = performance.now() - tPre0

      // -------- inference (runtime) --------
      const tInf0 = performance.now()

      const output = model.predict(input) as tf.Tensor
      const probs = await output.data()

      const inferenceMs = performance.now() - tInf0

      input.dispose()
      output.dispose()

      // -------- postprocess (argmax) --------
      const tPost0 = performance.now()

      let maxIdx = 0
      let maxVal = probs[0] ?? -Infinity
      for (let i = 1; i < probs.length; i++) {
        if (probs[i] > maxVal) {
          maxVal = probs[i]
          maxIdx = i
        }
      }

      const label = labels?.[maxIdx] ?? null
      setPrediction(label)

      const postprocessMs = performance.now() - tPost0
      const totalMs = performance.now() - tTotal0

      return {
        prediction: label,
        hasError: false,
        errorMessage: null,
        timeProcess: {
          preprocessMs,
          inferenceMs,
          postprocessMs,
          totalMs,
        },
      }
    } catch (e: any) {
      const res: PredictFromCanvasResult = {
        prediction: null,
        hasError: true,
        errorMessage: String(e?.message ?? e),
        timeProcess: {
          preprocessMs: 0,
          inferenceMs: 0,
          postprocessMs: 0,
          totalMs: performance.now() - tTotal0,
        },
      }
      setPrediction(null)
      return res
    } finally {
      setPredicting(false)
    }
  }

  return {
    ready: backendReady && !loadingModel && (labels?.length ?? 0) > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
