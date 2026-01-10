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
    let preprocessMs = 0
    let inferenceMs = 0
    let postprocessMs = 0

    const tTotal0 = performance.now()

    if (!session || !canvas || (labels?.length ?? 0) === 0) {
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

      // -------- preprocess --------
      const tPre0 = performance.now()
      let feeds: Record<string, ort.Tensor> | null = null
      let outputName = ''
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
        const inputName = session.inputNames[0]
        outputName = session.outputNames[0]

        // [1, 28, 28, 1]
        const inputTensor = new ort.Tensor('float32', data, [1, height, width, 1])

        feeds = { [inputName]: inputTensor }
      } finally {
        preprocessMs = performance.now() - tPre0
      }

      // -------- inference --------
      const tInf0 = performance.now()
      try {
        const outputs = await session.run(feeds!)
        const output = outputs[outputName] as ort.Tensor
        probs = output.data as Float32Array
      } finally {
        inferenceMs = performance.now() - tInf0
      }

      if (!probs) throw new Error('Inference failed (no output)')

      // -------- postprocess --------
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
    ready: ready && (labels?.length ?? 0) > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
