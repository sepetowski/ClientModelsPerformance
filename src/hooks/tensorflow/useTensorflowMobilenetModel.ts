import { useMemo, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { useTensorflowModelRunner } from './useTensorflowModelRunner'
import { imageElementToImageData } from '@/lib/imageElementToImageData'
import { preprocessMobilenetV2FromImageData } from '@/lib/preprocessMobilenetV2'
import type { AvaibleTensorflowBackendType } from '@/types/avaibleBackend'
import type {
  MobilenetModelResult,
  MobilenetTopItem,
  PredictFromImageResult,
} from '@/types/mobilenetModelResult'
import { useLabels } from '../useLabels'

export const useTensorflowMobilenetModel = (
  backend: AvaibleTensorflowBackendType
): MobilenetModelResult => {
  const options = useMemo(
    () => ({ backend, modelUrl: '/models/tensorflowjs/mobilenet/model.json' }),
    [backend]
  )

  const { model, backendReady, loadingModel } = useTensorflowModelRunner(options)

  const { data: labels } = useLabels('/labels/mobilenet/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [topK, setTopK] = useState<MobilenetTopItem[]>([])

  const predictFromImage = async (
    img: HTMLImageElement | null,
    k = 5
  ): Promise<PredictFromImageResult> => {
    let preprocessMs = 0
    let inferenceMs = 0
    let postprocessMs = 0

    const tTotal0 = performance.now()

    if (!model || !img || labels?.length === 0) {
      return {
        prediction: null,
        topK: [],
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
      if (!img.complete || img.naturalWidth === 0) {
        setTopK([])
        return {
          prediction: null,
          topK: [],
          hasError: true,
          errorMessage: 'Image not loaded',
          timeProcess: {
            preprocessMs: 0,
            inferenceMs: 0,
            postprocessMs: 0,
            totalMs: performance.now() - tTotal0,
          },
        }
      }

      let probs: Float32Array | null = null

      // -------- preprocess --------
      const tPre0 = performance.now()
      try {
        const imageData = imageElementToImageData(img)
        const processed = preprocessMobilenetV2FromImageData(imageData, 224)

        input = tf.tensor4d(processed.data, [1, processed.height, processed.width, 3], 'float32')
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

      // -------- postprocess --------
      const tPost0 = performance.now()
      let best: MobilenetTopItem[] = []
      let top1: string | null = null

      try {
        const kk = Math.max(1, Math.min(k, probs.length))
        const items: MobilenetTopItem[] = []

        for (let i = 0; i < probs.length; i++) {
          items.push({
            index: i,
            prob: probs[i],
            label: labels?.[i] ?? `class_${i}`,
          })
        }

        items.sort((a, b) => b.prob - a.prob)
        best = items.slice(0, kk)

        setTopK(best)
        top1 = best[0]?.label ?? null
      } finally {
        postprocessMs = performance.now() - tPost0
      }

      return {
        prediction: top1,
        topK: best,
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
      return {
        prediction: null,
        topK: [],
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
    ready: backendReady && (labels?.length ?? 0) > 0,
    loadingModel,
    predicting,
    topK,
    predictFromImage,
  }
}
