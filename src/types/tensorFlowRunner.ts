import type { AvaibleBackendType } from './avaibleBackend'
import * as tf from '@tensorflow/tfjs'

export interface UseTensorflowModelRunnerConfig {
  backend: AvaibleBackendType
  modelUrl: string
}

export interface UseTensorflowModelRunnerResult {
  model: tf.LayersModel | null
  backendReady: boolean
  loadingModel: boolean
}
