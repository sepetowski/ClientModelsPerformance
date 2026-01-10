import type { BenchmarkRow } from '@/types/benchmark'
import type { PredictResult } from '@/types/PredictResult'

export function predictResultToBenchmarkRow(
  data: PredictResult,
  backend: 'wasm' | 'cpu' | 'webgl',
  model: BenchmarkRow['model']
): BenchmarkRow {
  const ts = Date.now()

  return {
    id: crypto.randomUUID(),
    ts,
    model,
    backend,
    durationMs: data.timeProcess,
    prediction: data.prediction,
  }
}
