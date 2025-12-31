import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useTensorflowModelRunner } from './useTensorflowModelRunner'
import type { AvaibleTensorflowBackendType } from '@/types/avaibleBackend'
import type { EmnistModelResult } from '@/types/emnistModelResult'

export const useTensorflowEmnistModel = (
  backend: AvaibleTensorflowBackendType
): EmnistModelResult => {
  const { model, backendReady, loadingModel } = useTensorflowModelRunner({
    backend,
    modelUrl: '/models/tensorflowjs/emnist/model.json',
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
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)

        setLabels(parsed)
      } catch (err) {
        console.error('Failed to load EMNIST labels', err)
      }
    }

    loadLabels()
  }, [])

  const predictFromCanvas = async (canvas: HTMLCanvasElement | null): Promise<string | null> => {
    if (!model || !canvas || labels.length === 0) return null

    setPredicting(true)

    try {
      const processed = preprocessDigitCanvas(canvas)
      if (!processed) {
        setPrediction(null)
        return null
      }

      const { data, width, height } = processed

      const input = tf.tidy(() => tf.tensor4d(data, [1, height, width, 1]))

      const output = model.predict(input) as tf.Tensor
      const probs = await output.data()

      input.dispose()
      output.dispose()

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
      console.log('TF index:', maxIdx, 'Label:', label)

      return label
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
    predictFromCanvas,
  }
}
