import type { BenchmarkRow } from '@/types/benchmark'

export async function runMeasured<T>(
  model: BenchmarkRow['model'],
  backend: string,
  run: () => Promise<T>,
  getPrediction: (result: T) => string | null
): Promise<BenchmarkRow> {
  const t0 = performance.now()

  const result = await run()

  const t1 = performance.now()

  return {
    id: crypto.randomUUID(),
    ts: Date.now(),
    model,
    backend,
    durationMs: t1 - t0,
    prediction: getPrediction(result),
  }
}
