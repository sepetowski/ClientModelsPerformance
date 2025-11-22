import { useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import type { TensorFlowBackendType } from '@/types/tensorFlowBackend'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useTensorflowModelRunner } from './useTensorflowModelRunner'
import type { DigitModelResult } from '@/types/digitModelresult'

export const useTensorflowDigitModel = (backend: TensorFlowBackendType): DigitModelResult => {
  const { model, backendReady, loadingModel } = useTensorflowModelRunner({
    backend,
    modelUrl: '/models/tensorflowjs/digit/model.json',
  })

  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<number | null>(null)

  const predictFromCanvas = async (canvas: HTMLCanvasElement | null): Promise<number | null> => {
    if (!model) return null
    if (!canvas) return null

    setPredicting(true)

    try {
      const processed = preprocessDigitCanvas(canvas)
      if (!processed) {
        console.log('Empty drawing (no bounding box)')
        setPrediction(null)
        return null
      }

      const { data, width, height } = processed

      const input = tf.tidy(() => {
        return tf.tensor4d(data, [1, height, width, 1])
      })

      const output = model.predict(input) as tf.Tensor
      const probs = (await output.data()) as Float32Array

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

      setPrediction(maxIdx)
      console.log('TF probs:', probs, 'TF prediction:', maxIdx)
      return maxIdx
    } catch (e) {
      console.error('Error during TF prediction', e)
      return null
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
