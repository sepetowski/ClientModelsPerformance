import { useState } from 'react'
import * as ort from 'onnxruntime-web'
import { useOnnxModelRunner } from './useOnnxModelRunner'
import { imageElementToImageData } from '@/lib/imageElementToImageData'
import { preprocessMobilenetV2FromImageData } from '@/lib/preprocessMobilenetV2'
import type { MobilenetModelResult, MobilenetTopItem } from '@/types/mobilenetModelResult'
import { useLabels } from '../useLabels'

export const useOnnxMobilenetModel = (): MobilenetModelResult => {
  const { session, ready, loadingModel } = useOnnxModelRunner({
    modelUrl: '/models/onxx/mobilenet/model.onnx',
  })

  const { data: labels } = useLabels('/labels/mobilenet/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [topK, setTopK] = useState<MobilenetTopItem[]>([])

  const predictFromImage = async (img: HTMLImageElement | null, k = 5): Promise<string | null> => {
    if (!session || !img || labels?.length === 0) return null

    setPredicting(true)

    try {
      if (!img.complete || img.naturalWidth === 0) {
        setPrediction(null)
        setTopK([])
        return null
      }

      const imageData = imageElementToImageData(img)
      const processed = preprocessMobilenetV2FromImageData(imageData, 224)

      const inputName = session.inputNames[0]
      const outputName = session.outputNames[0]

      const inputTensor = new ort.Tensor('float32', processed.data, [
        1,
        processed.height,
        processed.width,
        3,
      ])

      const feeds: Record<string, ort.Tensor> = {
        [inputName]: inputTensor,
      }

      const outputs = await session.run(feeds)
      const output = outputs[outputName] as ort.Tensor
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

      console.log('ONNX top1:', best[0])
      return top1
    } catch (e) {
      throw e
    } finally {
      setPredicting(false)
    }
  }

  return {
    ready: ready && labels?.length! > 0,
    loadingModel,
    predicting,
    prediction,
    topK,
    predictFromImage,
  }
}
