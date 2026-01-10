export interface TimeProcess {
  preprocessMs?: number // img -> tensor
  inferenceMs?: number // model.predict/run + data()
  postprocessMs?: number // topK, sort, mapping
  totalMs?: number // whole process
}

export interface PredictResult {
  prediction: string | null
  hasError: boolean
  errorMessage?: string | null
  timeProcess: TimeProcess
}
