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
    let preprocessMs = 0
    let inferenceMs = 0
    let postprocessMs = 0

    const tTotal0 = performance.now()

    if (!model || !canvas || (labels?.length ?? 0) === 0) {
      setPrediction(null)
      return {
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
    }

    setPredicting(true)

    let input: tf.Tensor | null = null
    let output: tf.Tensor | null = null

    try {
      let probs: Float32Array | null = null

      // -------- preprocess (canvas -> tensor) --------
      const tPre0 = performance.now()
      try {
        const processed = preprocessDigitCanvas(canvas)

        if (!processed) {
          setPrediction(null)
          return {
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
        }

        const { data, width, height } = processed
        input = tf.tensor4d(data, [1, height, width, 1], 'float32')
      } finally {
        preprocessMs = performance.now() - tPre0
      }

      // -------- inference (predict + readback) --------
      const tInf0 = performance.now()
      try {
        output = model.predict(input!) as tf.Tensor
        probs = (await output.data()) as Float32Array
      } finally {
        inferenceMs = performance.now() - tInf0
      }

      if (!probs) throw new Error('Inference failed (no output)')

      // -------- postprocess (argmax) --------
      const tPost0 = performance.now()
      let label: string | null = null
      try {
        let maxIdx = 0
        let maxVal = probs[0] ?? -Infinity

        for (let i = 1; i < probs.length; i++) {
          if (probs[i] > maxVal) {
            maxVal = probs[i]
            maxIdx = i
          }
        }

        label = labels?.[maxIdx] ?? null
        setPrediction(label)
      } finally {
        postprocessMs = performance.now() - tPost0
      }

      return {
        prediction: label,
        hasError: false,
        errorMessage: null,
        timeProcess: {
          preprocessMs,
          inferenceMs,
          postprocessMs,
          totalMs: performance.now() - tTotal0,
        },
      }
    } catch (e: any) {
      setPrediction(null)
      return {
        prediction: null,
        hasError: true,
        errorMessage: String(e?.message ?? e),
        timeProcess: {
          preprocessMs,
          inferenceMs,
          postprocessMs,
          totalMs: performance.now() - tTotal0,
        },
      }
    } finally {
      if (input) input.dispose()
      if (output) output.dispose()
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
