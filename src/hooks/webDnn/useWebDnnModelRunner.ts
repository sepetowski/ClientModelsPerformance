import { useEffect, useState } from 'react'
import type { UseWebDnnModelRunnerConfig, UseWebDnnModelRunnerResult } from '@/types/webdnnRunner'

const runnerCache = new Map<string, any>()

export const useWebDnnModelRunner = (
  config: UseWebDnnModelRunnerConfig
): UseWebDnnModelRunnerResult => {
  const { backend, modelDir } = config
  const [runner, setRunner] = useState<any | null>(null)
  const [backendReady, setBackendReady] = useState(false)
  const [loadingModel, setLoadingModel] = useState(false)

  const cacheKey = `${backend}:${modelDir}`

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      setBackendReady(false)
      setRunner(null)
      setLoadingModel(true)

      try {
        const wantedBackends = [backend]

        if (runnerCache.has(cacheKey)) {
          if (!cancelled) {
            setRunner(runnerCache.get(cacheKey))
            setBackendReady(true)
          }
          return
        }

        const r = await WebDNN.load(modelDir, {
          backendOrder: wantedBackends,
        })

        runnerCache.set(cacheKey, r)

        if (!cancelled) {
          setRunner(r)
          setBackendReady(true)
          console.log(`WebDNN backend: ${backend}`)
        }
      } catch (e) {
        console.error('Error loading WebDNN model', e)
      } finally {
        if (!cancelled) {
          setLoadingModel(false)
        }
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [backend, modelDir])

  return {
    runner,
    backendReady,
    loadingModel,
  }
}
