export type BenchmarkRow = {
  id: string
  ts: number
  model: 'TF' | 'ONNX' | 'WebDNN'
  backend: string
  durationMs: number
  prediction: string | null
}

export type Stats = {
  n: number
  med: number | null
  mean: number | null
  std: number | null
  min: number | null
  max: number | null
  p95: number | null
  p99: number | null
}
