import { useMemo, useState } from 'react'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useWebDnnModelRunner } from './useWebDnnModelRunner'
import type { AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import type { EmnistModelResult } from '@/types/emnistModelResult'
import { useLabels } from '../useLabels'

export const useWebDnnEmnistModel = (backend: AvaibleWebdnnBackendType): EmnistModelResult => {
  const options = useMemo(() => ({ backend, modelDir: '/models/onxx/emnist/' }), [backend])

  const { runner, backendReady, loadingModel } = useWebDnnModelRunner(options)

  const { data: labels } = useLabels('/labels/emnist/labels.txt')
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)

  const predictFromCanvas = async (canvas: HTMLCanvasElement | null): Promise<string | null> => {
    if (!runner || !canvas || labels?.length === 0) return null

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

      const label = labels ? labels[maxIdx] : null
      setPrediction(label)
      return label
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
    predictFromCanvas,
  }
}
