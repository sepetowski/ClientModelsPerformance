import * as ort from 'onnxruntime-web'

export interface UseOnnxModelRunnerOptions {
  modelUrl: string
}

export interface UseOnnxModelRunnerResult {
  session: ort.InferenceSession | null
  ready: boolean
  loadingModel: boolean
}
