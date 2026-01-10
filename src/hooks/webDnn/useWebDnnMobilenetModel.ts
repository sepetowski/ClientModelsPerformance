import { useMemo, useState } from 'react'
import { useWebDnnModelRunner } from './useWebDnnModelRunner'
import { imageElementToImageData } from '@/lib/imageElementToImageData'
import { preprocessMobilenetV2FromImageData } from '@/lib/preprocessMobilenetV2'
import type { AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import type { MobilenetModelResult, MobilenetTopItem } from '@/types/mobilenetModelResult'
import { useLabels } from '../useLabels'

declare const WebDNN: any

export const useWebDnnMobilenetModel = (
  backend: AvaibleWebdnnBackendType
): MobilenetModelResult => {
  const options = useMemo(() => ({ backend, modelDir: '/models/onxx/mobilenet/' }), [backend])
  const { runner, backendReady, loadingModel } = useWebDnnModelRunner(options)

  const { data: labels } = useLabels('/labels/mobilenet/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [topK, setTopK] = useState<MobilenetTopItem[]>([])

  const predictFromImage = async (img: HTMLImageElement | null, k = 5): Promise<string | null> => {
    if (!runner || !img || labels?.length === 0) return null

    setPredicting(true)

    try {
      if (!img.complete || img.naturalWidth === 0) {
        setPrediction(null)
        setTopK([])
        return null
      }

      const imageData = imageElementToImageData(img)
      const processed = preprocessMobilenetV2FromImageData(imageData, 224)

      const inputTensor = new WebDNN.CPUTensor(
        [1, processed.height, processed.width, 3],
        'float32',
        processed.data
      )

      const [output] = await runner.run([inputTensor])
      const probs = output.data as Float32Array

      const kk = Math.max(1, Math.min(k, probs.length))
      const items: MobilenetTopItem[] = []

      if (labels) {
        for (let i = 0; i < probs.length; i++) {
          items.push({
            index: i,
            prob: probs[i],
            label: labels[i] ?? `class_${i}`,
          })
        }
      }

      items.sort((a, b) => b.prob - a.prob)
      const best = items.slice(0, kk)

      setTopK(best)
      const top1 = best[0]?.label ?? null
      setPrediction(top1)

      console.log('WebDNN top1:', best[0])
      return top1
    } catch (e) {
      throw e
    } finally {
      setPredicting(false)
    }
  }

  return {
    ready: backendReady && labels?.length! > 0,
    loadingModel,
    predicting,
    prediction,
    topK,
    predictFromImage,
  }
}
