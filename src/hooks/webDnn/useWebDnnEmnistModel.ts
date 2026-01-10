import { useMemo, useState } from 'react'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useWebDnnModelRunner } from './useWebDnnModelRunner'
import type { AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import type { EmnistModelResult, PredictFromCanvasResult } from '@/types/emnistModelResult'
import { useLabels } from '../useLabels'

export const useWebDnnEmnistModel = (backend: AvaibleWebdnnBackendType): EmnistModelResult => {
  const options = useMemo(() => ({ backend, modelDir: '/models/onxx/emnist/' }), [backend])
  const { runner, backendReady, loadingModel } = useWebDnnModelRunner(options)

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

    if (!runner || !canvas || (labels?.length ?? 0) === 0) {
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

    try {
      let probs: Float32Array | null = null

      // -------- preprocess (canvas -> tensor data) --------
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
        const inputTensor = new WebDNN.CPUTensor([1, height, width, 1], 'float32', data)

        // -------- inference (runtime) --------
        const tInf0 = performance.now()
        try {
          const [output] = await runner.run([inputTensor])
          probs = output.data as Float32Array
        } finally {
          inferenceMs = performance.now() - tInf0
        }
      } finally {
        preprocessMs = performance.now() - tPre0
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
      setPredicting(false)
    }
  }

  return {
    ready: backendReady && (labels?.length ?? 0) > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
