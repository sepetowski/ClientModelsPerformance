import { useState } from 'react'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useWebDnnModelRunner } from './useWebDnnModelRunner'
import type { DigitModelResult } from '@/types/digitModelresult'
import type { AvaibleBackendType } from '@/types/avaibleBackend'

export const useWebDnnDigitModel = (backend: AvaibleBackendType): DigitModelResult => {
  const { runner, backendReady, loadingModel } = useWebDnnModelRunner({
    backend,
    modelDir: '/models/onxx/digit/',
  })

  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<number | null>(null)

  const predictFromCanvas = async (canvas: HTMLCanvasElement | null) => {
    if (!runner) return null
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
      const inputTensor = new WebDNN.CPUTensor([1, height, width, 1], 'float32', data)

      const [output] = await runner.run([inputTensor])
      const probs = output.data as Float32Array

      let maxIdx = 0
      let maxVal = probs[0]
      for (let i = 1; i < probs.length; i++) {
        if (probs[i] > maxVal) {
          maxVal = probs[i]
          maxIdx = i
        }
      }

      setPrediction(maxIdx)
      return maxIdx
    } catch (e) {
      console.error('Error during WebDNN prediction', e)
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
