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

      // -------- preprocess (img -> tensor) --------
      const tPre0 = performance.now()

      const imageData = imageElementToImageData(img)
      const processed = preprocessMobilenetV2FromImageData(imageData, 224)

      const input = tf.tensor4d(
        processed.data,
        [1, processed.height, processed.width, 3],
        'float32'
      )

      const preprocessMs = performance.now() - tPre0

      // -------- inference (runtime) --------
      const tInf0 = performance.now()

      const output = model.predict(input) as tf.Tensor
      const probs = await output.data()

      const inferenceMs = performance.now() - tInf0

      // ważne: sprzątanie po inferencji
      input.dispose()
      output.dispose()

      // -------- postprocess (topK) --------
      const tPost0 = performance.now()

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
      const best = items.slice(0, kk)

      setTopK(best)

      const top1 = best[0]?.label ?? null

      const postprocessMs = performance.now() - tPost0
      const totalMs = performance.now() - tTotal0

      return {
        prediction: top1,
        topK: best,
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
      return {
        prediction: null,
        topK: [],
        hasError: true,
        errorMessage: String(e?.message ?? e),
        timeProcess: {
          preprocessMs: 0,
          inferenceMs: 0,
          postprocessMs: 0,
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
    topK,
    predictFromImage,
  }
}
