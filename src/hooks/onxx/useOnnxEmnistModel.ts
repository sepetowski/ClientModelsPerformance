import { useState } from 'react'
import * as ort from 'onnxruntime-web'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useOnnxModelRunner } from './useOnnxModelRunner'
import type { EmnistModelResult, PredictFromCanvasResult } from '@/types/emnistModelResult'
import { useLabels } from '../useLabels'

export const useOnnxEmnistModel = (): EmnistModelResult => {
  const { session, ready, loadingModel } = useOnnxModelRunner({
    modelUrl: '/models/onxx/emnist/model.onnx',
  })

  const { data: labels } = useLabels('/labels/emnist/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)

  const predictFromCanvas = async (
    canvas: HTMLCanvasElement | null
  ): Promise<PredictFromCanvasResult> => {
    const tTotal0 = performance.now()

    if (!session || !canvas || (labels?.length ?? 0) === 0) {
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
      const inputName = session.inputNames[0]
      const outputName = session.outputNames[0]

      // [1, 28, 28, 1]
      const inputTensor = new ort.Tensor('float32', data, [1, height, width, 1])

      const feeds: Record<string, ort.Tensor> = {
        [inputName]: inputTensor,
      }

      const preprocessMs = performance.now() - tPre0

      // -------- inference (runtime) --------
      const tInf0 = performance.now()

      const outputs = await session.run(feeds)
      const output = outputs[outputName] as ort.Tensor
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
    ready: ready && (labels?.length ?? 0) > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
