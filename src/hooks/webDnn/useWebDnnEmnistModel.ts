import { useEffect, useState } from 'react'
import { preprocessDigitCanvas } from '@/lib/preprocessDigitCanvas'
import { useWebDnnModelRunner } from './useWebDnnModelRunner'
import type { AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import type { EmnistModelResult } from '@/types/emnistModelResult'

export const useWebDnnEmnistModel = (backend: AvaibleWebdnnBackendType): EmnistModelResult => {
  const { runner, backendReady, loadingModel } = useWebDnnModelRunner({
    backend,
    modelDir: '/models/onxx/emnist/',
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
    if (!runner || !canvas || labels.length === 0) return null

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

      const label = labels[maxIdx] ?? null
      setPrediction(label)
      return label
    } catch (e) {
      throw e
    } finally {
      setPredicting(false)
    }
  }

  return {
    ready: backendReady && labels.length > 0,
    loadingModel,
    predicting,
    prediction,
    predictFromCanvas,
  }
}
