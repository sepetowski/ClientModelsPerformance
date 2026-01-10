import { useMemo, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useTensorflowModelRunner } from './useTensorflowModelRunner'
import type { AvaibleTensorflowBackendType } from '@/types/avaibleBackend'
import type { EmnistModelResult } from '@/types/emnistModelResult'
import { useLabels } from '../useLabels'

export const useTensorflowEmnistModel = (
  backend: AvaibleTensorflowBackendType
): EmnistModelResult => {
  const options = useMemo(
    () => ({ backend, modelUrl: '/models/tensorflowjs/emnist/model.json' }),
    [backend]
  )
  const { model, backendReady, loadingModel } = useTensorflowModelRunner(options)

  const { data: labels } = useLabels('/labels/emnist/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)

  const predictFromCanvas = async (canvas: HTMLCanvasElement | null): Promise<string | null> => {
    if (!model || !canvas || labels?.length === 0) return null

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

      const label = labels ? labels[maxIdx] : null

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
    ready: backendReady && !loadingModel && labels?.length! > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
