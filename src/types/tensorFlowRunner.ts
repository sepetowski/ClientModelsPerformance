import type { TensorFlowBackendType } from './tensorFlowBackend'
import * as tf from '@tensorflow/tfjs'

export interface UseTensorflowModelRunnerConfig {
  backend: TensorFlowBackendType
  modelUrl: string
}

export interface UseTensorflowModelRunnerResult {
  model: tf.LayersModel | null
  backendReady: boolean
  loadingModel: boolean
}
