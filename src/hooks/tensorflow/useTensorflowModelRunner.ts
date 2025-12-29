import { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-wasm'
import type {
  UseTensorflowModelRunnerConfig,
  UseTensorflowModelRunnerResult,
} from '@/types/tensorFlowRunner'

const modelCache = new Map<string, tf.LayersModel>()

export const useTensorflowModelRunner = (
  config: UseTensorflowModelRunnerConfig
): UseTensorflowModelRunnerResult => {
  const { backend, modelUrl } = config

  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const [backendReady, setBackendReady] = useState(false)
  const [loadingModel, setLoadingModel] = useState(false)

  useEffect(() => {
    let cancelled = false

    const initBackend = async () => {
      setBackendReady(false)
      setModel(null)

      try {
        await tf.setBackend(backend)
        await tf.ready()

        if (!cancelled) {
          console.log('TF backend set to:', tf.getBackend())
          setBackendReady(true)
        }
      } catch (e) {
        console.error('Error setting TF backend', e)
      }
    }

    initBackend()

    return () => {
      cancelled = true
    }
  }, [backend])

  useEffect(() => {
    if (!backendReady) return

    let cancelled = false
    const cacheKey = `${backend}:${modelUrl}`

    const loadModel = async () => {
      try {
        setLoadingModel(true)

        if (tf.getBackend() !== backend) return

        if (modelCache.has(cacheKey)) {
          const cached = modelCache.get(cacheKey)!
          if (!cancelled) setModel(cached)
          return
        }

        const m = await tf.loadLayersModel(modelUrl)
        modelCache.set(cacheKey, m)
        if (!cancelled) setModel(m)
      } catch (err) {
        console.error('Error loading TF model', err)
      } finally {
        if (!cancelled) {
          setLoadingModel(false)
        }
      }
    }

    loadModel()

    return () => {
      cancelled = true
    }
  }, [backendReady, backend, modelUrl])

  return {
    model,
    backendReady,
    loadingModel,
  }
}
