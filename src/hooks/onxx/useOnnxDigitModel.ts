import { useState } from 'react'
import * as ort from 'onnxruntime-web'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useOnnxModelRunner } from './useOnnxModelRunner'
import type { DigitModelResult } from '@/types/digitModelrESULT'

export const useOnnxDigitModel = (): DigitModelResult => {
  const { session, ready, loadingModel } = useOnnxModelRunner({
    modelUrl: '/models/onxx/digit/model.onnx',
  })

  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<number | null>(null)

  const predictFromCanvas = async (canvas: HTMLCanvasElement | null): Promise<number | null> => {
    if (!session) return null
    if (!canvas) return null

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

      //[1, 28, 28, 1]
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

      setPrediction(maxIdx)
      console.log('ONNX probs:', probs, 'ONNX prediction:', maxIdx)
      return maxIdx
    } catch (e) {
      console.error('Error during ONNX prediction', e)
      return null
    } finally {
      setPredicting(false)
    }
  }

  return {
    ready,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
