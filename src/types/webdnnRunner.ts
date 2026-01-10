import type { AvaibleWebdnnBackendType } from './avaibleBackend'

export interface UseWebDnnModelRunnerConfig {
  backend: AvaibleWebdnnBackendType
  modelDir: string
}

export interface UseWebDnnModelRunnerResult {
  runner: any | null
  backendReady: boolean
  loadingModel: boolean
}
