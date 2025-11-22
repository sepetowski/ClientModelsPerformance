import { useEffect, useState } from 'react'
import * as ort from 'onnxruntime-web'
import type { UseOnnxModelRunnerOptions, UseOnnxModelRunnerResult } from '@/types/onxxRunnerl'

export const useOnnxModelRunner = ({
  modelUrl,
}: UseOnnxModelRunnerOptions): UseOnnxModelRunnerResult => {
  const [session, setSession] = useState<ort.InferenceSession | null>(null)
  const [ready, setReady] = useState(false)
  const [loadingModel, setLoadingModel] = useState(false)
  ort.env.wasm.wasmPaths = '/wasm/onxx/'

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoadingModel(true)
        setReady(false)
        setSession(null)

        const s = await ort.InferenceSession.create(modelUrl)

        if (!cancelled) {
          setSession(s)
          setReady(true)
          console.log('ONNX session ready for', modelUrl)
        }
      } catch (e) {
        console.error('Error loading ONNX model', e)
      } finally {
        if (!cancelled) {
          setLoadingModel(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [modelUrl])

  return {
    session,
    ready,
    loadingModel,
  }
}
