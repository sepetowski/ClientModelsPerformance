import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { useTensorflowModelRunner } from './useTensorflowModelRunner'
import { imageElementToImageData } from '@/lib/imageElementToImageData'
import { preprocessMobilenetV2FromImageData } from '@/lib/preprocessMobilenetV2'
import type { AvaibleTensorflowBackendType } from '@/types/avaibleBackend'
import type { MobilenetModelResult, MobilenetTopItem } from '@/types/mobilenetModelResult'

export const useTensorflowMobilenetModel = (
  backend: AvaibleTensorflowBackendType
): MobilenetModelResult => {
  const { model, backendReady, loadingModel } = useTensorflowModelRunner({
    backend,
    modelUrl: '/models/tensorflowjs/mobilenet/model.json',
  })

  const [labels, setLabels] = useState<string[]>([])
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [topK, setTopK] = useState<MobilenetTopItem[]>([])

  useEffect(() => {
    const loadLabels = async () => {
      try {
        const res = await fetch('/labels/mobilenet/labels.txt')
        const text = await res.text()
        const parsed = text
          .split('\n')
          .map((l) => l.trim().replace(/_/g, ' '))
          .filter(Boolean)

        setLabels(parsed)
      } catch (err) {
        console.error('Failed to load ImageNet labels', err)
      }
    }

    loadLabels()
  }, [])

  const predictFromImage = async (img: HTMLImageElement | null, k = 5): Promise<string | null> => {
    if (!model || !img || labels.length === 0) return null

    setPredicting(true)

    try {
      if (!img.complete || img.naturalWidth === 0) {
        setPrediction(null)
        setTopK([])
        return null
      }

      const imageData = imageElementToImageData(img)

      const processed = preprocessMobilenetV2FromImageData(imageData, 224)
      const input = tf.tensor4d(
        processed.data,
        [1, processed.height, processed.width, 3],
        'float32'
      )

      const output = model.predict(input) as tf.Tensor
      const probs = await output.data()

      input.dispose()
      output.dispose()

      const kk = Math.max(1, Math.min(k, probs.length))
      const items: MobilenetTopItem[] = []

      for (let i = 0; i < probs.length; i++) {
        items.push({
          index: i,
          prob: probs[i],
          label: labels[i] ?? `class_${i}`,
        })
      }

      items.sort((a, b) => b.prob - a.prob)
      const best = items.slice(0, kk)

      setTopK(best)

      const top1 = best[0]?.label ?? null
      setPrediction(top1)

      console.log('TF top1:', best[0])
      return top1
    } catch (e) {
      throw e
    } finally {
      setPredicting(false)
    }
  }

  return {
    ready: backendReady,
    loadingModel,
    predicting,
    prediction,
    topK,
    predictFromImage,
  }
}
