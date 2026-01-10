import { useMemo, useState } from 'react'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useWebDnnModelRunner } from './useWebDnnModelRunner'
import type { AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import type { EmnistModelResult, PredictFromCanvasResult } from '@/types/emnistModelResult'
import { useLabels } from '../useLabels'

declare const WebDNN: any

export const useWebDnnEmnistModel = (backend: AvaibleWebdnnBackendType): EmnistModelResult => {
  const options = useMemo(() => ({ backend, modelDir: '/models/onxx/emnist/' }), [backend])
  const { runner, backendReady, loadingModel } = useWebDnnModelRunner(options)

  const { data: labels } = useLabels('/labels/emnist/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)

  const predictFromCanvas = async (
    canvas: HTMLCanvasElement | null
  ): Promise<PredictFromCanvasResult> => {
    const tTotal0 = performance.now()

    if (!runner || !canvas || (labels?.length ?? 0) === 0) {
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
      // -------- preprocess (canvas -> tensor data) --------
      const tPre0 = performance.now()

      const processed = preprocessDigitCanvas(canvas)
      if (!processed) {
        // pusty rysunek traktujemy jako “brak predykcji”, ale bez wyjątku
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
      const inputTensor = new WebDNN.CPUTensor([1, height, width, 1], 'float32', data)

      const preprocessMs = performance.now() - tPre0

      // -------- inference (runtime) --------
      const tInf0 = performance.now()

      const [output] = await runner.run([inputTensor])
      const probs = output.data as Float32Array

      const inferenceMs = performance.now() - tInf0

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
    ready: backendReady && (labels?.length ?? 0) > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
