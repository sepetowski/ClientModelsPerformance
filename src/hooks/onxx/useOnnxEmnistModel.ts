import { useEffect, useState } from 'react'
import * as ort from 'onnxruntime-web'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useOnnxModelRunner } from './useOnnxModelRunner'
import type { EmnistModelResult } from '@/types/emnistModelResult'

export const useOnnxEmnistModel = (): EmnistModelResult => {
  const { session, ready, loadingModel } = useOnnxModelRunner({
    modelUrl: '/models/onxx/emnist/model.onnx',
  })

  const [labels, setLabels] = useState<string[]>([])
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)

  useEffect(() => {
    const loadLabels = async () => {
      try {
        const res = await fetch('/labels/emnist/labels.txt')
        const text = await res.text()
        const parsed = text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean)

        setLabels(parsed)
      } catch (err) {
        console.error('Failed to load EMNIST labels', err)
        setLabels([])
      }
    }

    loadLabels()
  }, [])

  const predictFromCanvas = async (canvas: HTMLCanvasElement | null): Promise<string | null> => {
    if (!session || !canvas || labels.length === 0) return null

    setPredicting(true)

    try {
      const processed = preprocessDigitCanvas(canvas)
      if (!processed) {
        console.log('Empty bounding box, nothing to predict (ONNX)')
        setPrediction(null)
        return null
      }

      const { data, width, height } = processed
      const inputName = session.inputNames[0]

      // [1, 28, 28, 1]
      const inputTensor = new ort.Tensor('float32', data, [1, height, width, 1])

      const feeds: Record<string, ort.Tensor> = {
        [inputName]: inputTensor,
      }

      const outputs = await session.run(feeds)
      const outputName = session.outputNames[0]
      const output = outputs[outputName] as ort.Tensor
      const probs = output.data as Float32Array

      let maxIdx = 0
      let maxVal = probs[0]
      for (let i = 1; i < probs.length; i++) {
        if (probs[i] > maxVal) {
          maxVal = probs[i]
          maxIdx = i
        }
      }

      const label = labels[maxIdx] ?? null
      setPrediction(label)

      console.log('ONNX index:', maxIdx, 'Label:', label)
      return label
    } catch (e) {
      throw e
    } finally {
      setPredicting(false)
    }
  }

  return {
    ready: ready && labels.length > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
