import { useMemo, useState } from 'react'
import { useWebDnnModelRunner } from './useWebDnnModelRunner'
import { imageElementToImageData } from '@/lib/imageElementToImageData'
import { preprocessMobilenetV2FromImageData } from '@/lib/preprocessMobilenetV2'
import type { AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import type {
  MobilenetModelResult,
  MobilenetTopItem,
  PredictFromImageResult,
} from '@/types/mobilenetModelResult'
import { useLabels } from '../useLabels'

export const useWebDnnMobilenetModel = (
  backend: AvaibleWebdnnBackendType
): MobilenetModelResult => {
  const options = useMemo(() => ({ backend, modelDir: '/models/onxx/mobilenet/' }), [backend])

  const { runner, backendReady, loadingModel } = useWebDnnModelRunner(options)
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

    if (!runner || !img || labels?.length === 0) {
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

      let inputTensor: any
      let probs: Float32Array | null = null

      // -------- preprocess --------
      const tPre0 = performance.now()
      try {
        const imageData = imageElementToImageData(img)
        const processed = preprocessMobilenetV2FromImageData(imageData, 224)

        inputTensor = new WebDNN.CPUTensor(
          [1, processed.height, processed.width, 3],
          'float32',
          processed.data
        )
      } finally {
        preprocessMs = performance.now() - tPre0
      }

      // -------- inference --------
      const tInf0 = performance.now()
      try {
        const [output] = await runner.run([inputTensor])
        probs = output.data as Float32Array
      } finally {
        inferenceMs = performance.now() - tInf0
      }

      if (!probs) throw new Error('Inference failed (no output)')

      // -------- postprocess --------
      const tPost0 = performance.now()
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
        const best = items.slice(0, kk)

        setTopK(best)

        return {
          prediction: best[0]?.label ?? null,
          topK: best,
          hasError: false,
          errorMessage: null,
          timeProcess: {
            preprocessMs,
            inferenceMs,
            postprocessMs: performance.now() - tPost0,
            totalMs: performance.now() - tTotal0,
          },
        }
      } finally {
        postprocessMs = performance.now() - tPost0
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
