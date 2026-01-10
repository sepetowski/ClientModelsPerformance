import type { TimeProcess } from './PredictResult'

export interface BenchmarkRow {
  id: string
  ts: number
  model: 'TF' | 'ONNX' | 'WebDNN'
  backend: string
  durationMs: TimeProcess
  prediction: string | null
}

export interface Stats {
  n: number
  med: number | null
  mean: number | null
  std: number | null
  min: number | null
  max: number | null
  p95: number | null
  p99: number | null
}
