import { useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import type { TensorFlowBackendType } from '@/types/tensorFlowBackend'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useTensorflowModelRunner } from './useTensorflowModelRunner'
import type { UseTensorflowDigitModelResult } from '@/types/tensorflowDigitModel'

export const useTensorflowDigitModel = (
  backend: TensorFlowBackendType
): UseTensorflowDigitModelResult => {
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
      const imgData = preprocessDigitCanvas(canvas)
      if (!imgData) {
        console.log('Brak rysunku (pusty bounding box)')
        setPrediction(null)
        return null
      }

      const input = tf.tidy(() => {
        let x = tf.browser.fromPixels(imgData, 1).toFloat().div(255)
        x = tf.sub(1, x)
        x = x.greater(0.2).cast('float32')
        return x.reshape([1, 28, 28, 1])
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
    backendReady,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
