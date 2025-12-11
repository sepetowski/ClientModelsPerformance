import type { AvaibleBackendType } from './avaibleBackend'

export interface UseWebDnnModelRunnerConfig {
  backend: AvaibleBackendType
  modelDir: string
}

export interface UseWebDnnModelRunnerResult {
  runner: any | null
  backendReady: boolean
  loadingModel: boolean
}
