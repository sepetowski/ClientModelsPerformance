import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  median,
  stdDev,
  p95,
  p99,
  formatMs,
  formatTime,
  max,
  mean,
  min,
  compareStats,
} from '@/lib/utils'
import type { BenchmarkRow, Stats } from '@/types/benchmark'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import type { TimeProcess } from '@/types/PredictResult'

type Props = {
  rows: BenchmarkRow[]
  defaultGroupByModel?: boolean
}

type Group = {
  key: string
  title: string
  rows: BenchmarkRow[]
}

type MetricKey = 'totalMs' | 'inferenceMs' | 'preprocessMs' | 'postprocessMs'

const METRICS: { key: MetricKey; label: string }[] = [
  { key: 'inferenceMs', label: 'Inference' },
  { key: 'totalMs', label: 'Total' },
  { key: 'preprocessMs', label: 'Preprocess' },
  { key: 'postprocessMs', label: 'Postprocess' },
]

function ModelBadge({ model }: { model: BenchmarkRow['model'] }) {
  const variant = model === 'ONNX' ? 'default' : model === 'TF' ? 'secondary' : 'outline'
  return <Badge variant={variant}>{model}</Badge>
}

function getMetricValue(tp: TimeProcess | undefined, metric: MetricKey): number | null {
  const v = tp?.[metric]
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

export const BenchmarkTable = ({ rows, defaultGroupByModel = true }: Props) => {
  const allModels = useMemo(() => ['TF', 'ONNX', 'WebDNN'] as const, [])
  const allBackends = useMemo(() => Array.from(new Set(rows.map((r) => r.backend))).sort(), [rows])

  const [selectedModels, setSelectedModels] = useState<Set<BenchmarkRow['model']>>(
    () => new Set(allModels)
  )
  const [selectedBackends, setSelectedBackends] = useState<Set<string>>(() => new Set(allBackends))

  useEffect(() => {
    setSelectedBackends((prev) => {
      const next = new Set(prev)
      for (const b of allBackends) next.add(b)
      return next
    })
  }, [allBackends])

  const [groupByModel, setGroupByModel] = useState(defaultGroupByModel)

  const pageSizeOptions = useMemo(() => [10, 25, 50, 100] as const, [])
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(25)
  const [pageIndex, setPageIndex] = useState(0)

  // ✅ wybór metryki czasu
  const [metric, setMetric] = useState<MetricKey>('inferenceMs')

  const filteredAll = useMemo(() => {
    return rows.filter((r) => selectedModels.has(r.model) && selectedBackends.has(r.backend))
  }, [rows, selectedModels, selectedBackends])

  useEffect(() => {
    setPageIndex(0)
  }, [selectedModels, selectedBackends, pageSize])

  const pageCount = useMemo(() => {
    return Math.max(1, Math.ceil(filteredAll.length / pageSize))
  }, [filteredAll.length, pageSize])

  useEffect(() => {
    setPageIndex((p) => Math.max(0, Math.min(p, pageCount - 1)))
  }, [pageCount])

  const filtered = useMemo(() => {
    const start = pageIndex * pageSize
    return filteredAll.slice(start, start + pageSize)
  }, [filteredAll, pageIndex, pageSize])

  const groups: Group[] = useMemo(() => {
    if (!groupByModel) {
      return [{ key: 'all', title: 'All results', rows: filtered }]
    }

    const map = new Map<string, BenchmarkRow[]>()
    for (const r of filtered) {
      const key = r.model
      const arr = map.get(key) ?? []
      arr.push(r)
      map.set(key, arr)
    }

    return (['TF', 'ONNX', 'WebDNN'] as const)
      .filter((m) => map.has(m))
      .map((m) => ({
        key: m,
        title: m,
        rows: map.get(m) ?? [],
      }))
  }, [filtered, groupByModel])

  const statsGroups: Group[] = useMemo(() => {
    if (!groupByModel) {
      return [{ key: 'all', title: 'All results', rows: filteredAll }]
    }

    const map = new Map<string, BenchmarkRow[]>()
    for (const r of filteredAll) {
      const key = r.model
      const arr = map.get(key) ?? []
      arr.push(r)
      map.set(key, arr)
    }

    return (['TF', 'ONNX', 'WebDNN'] as const)
      .filter((m) => map.has(m))
      .map((m) => ({
        key: m,
        title: m,
        rows: map.get(m) ?? [],
      }))
  }, [filteredAll, groupByModel])

  const statsByKey = useMemo(() => {
    const m = new Map<string, Stats>()

    for (const g of statsGroups) {
      // ✅ statystyki z wybranej metryki i tylko wartości liczbowych
      const durations = g.rows
        .map((r) => getMetricValue(r.durationMs, metric))
        .filter((v): v is number => typeof v === 'number')

      m.set(g.key, {
        n: durations.length,
        med: durations.length ? median(durations) : null,
        mean: durations.length ? mean(durations) : null,
        std: durations.length ? stdDev(durations) : null,
        min: durations.length ? min(durations) : null,
        max: durations.length ? max(durations) : null,
        p95: durations.length ? p95(durations) : null,
        p99: durations.length ? p99(durations) : null,
      })
    }

    return m
  }, [statsGroups, metric])

  function toggleModel(m: BenchmarkRow['model']) {
    setSelectedModels((prev) => {
      const next = new Set(prev)
      if (next.has(m)) next.delete(m)
      else next.add(m)
      return next
    })
  }

  function toggleBackend(b: string) {
    setSelectedBackends((prev) => {
      const next = new Set(prev)
      if (next.has(b)) next.delete(b)
      else next.add(b)
      return next
    })
  }

  const bestModelKey = useMemo(() => {
    if (!groupByModel) return null

    const entries = Array.from(statsByKey.entries())
      .filter(([key]) => key !== 'all')
      .filter(([, s]) => s.n > 0 && s.med !== null)

    if (entries.length === 0) return null

    entries.sort((a, b) => compareStats(a[1], b[1]))
    return entries[0]![0]
  }, [statsByKey, groupByModel])

  const metricLabel = useMemo(
    () => METRICS.find((m) => m.key === metric)?.label ?? metric,
    [metric]
  )

  return (
    <div className="h-full overflow-hidden">
      <Card className="max-h-[80vh] overflow-y-auto">
        <CardHeader>
          {bestModelKey && (
            <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-1">
                  Best stats ({metricLabel}): <span className="font-medium">{bestModelKey}*</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                * Best library is selected based on the lowest median latency (p50), then p95, mean
                latency, standard deviation, and number of samples.
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                      Model ({selectedModels.size})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Filter by model</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {allModels.map((m) => (
                      <DropdownMenuCheckboxItem
                        key={m}
                        checked={selectedModels.has(m)}
                        onCheckedChange={() => toggleModel(m)}
                      >
                        {m}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                      Backend ({selectedBackends.size})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Filter by backend</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {allBackends.length === 0 ? (
                      <div className="px-2 py-1 text-sm text-muted-foreground">No backends yet</div>
                    ) : (
                      allBackends.map((b) => (
                        <DropdownMenuCheckboxItem
                          key={b}
                          checked={selectedBackends.has(b)}
                          onCheckedChange={() => toggleBackend(b)}
                        >
                          {b}
                        </DropdownMenuCheckboxItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* ✅ wybór metryki */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                      Metric ({metricLabel})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Time metric</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {METRICS.map((m) => (
                      <DropdownMenuCheckboxItem
                        key={m.key}
                        checked={metric === m.key}
                        onCheckedChange={() => setMetric(m.key)}
                      >
                        {m.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setGroupByModel((v) => !v)}
                >
                  {groupByModel ? 'Ungroup' : 'Group by model'}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                      Page size ({pageSize})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Rows per page</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {pageSizeOptions.map((s) => (
                      <DropdownMenuCheckboxItem
                        key={s}
                        checked={pageSize === s}
                        onCheckedChange={() => setPageSize(s)}
                      >
                        {s}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredAll.length}</span> /
                <span className="ml-1">{rows.length}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[110px]">Time</TableHead>
                    <TableHead className="w-[90px]">Model</TableHead>
                    <TableHead>Backend</TableHead>
                    <TableHead className="text-right">{metricLabel} (ms)</TableHead>
                    <TableHead className="text-right">Prediction</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredAll.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-10 text-center text-sm text-muted-foreground"
                      >
                        No rows match your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    groups.map((g) => {
                      const s = statsByKey.get(g.key) ?? {
                        n: 0,
                        med: null,
                        mean: null,
                        std: null,
                        min: null,
                        max: null,
                        p95: null,
                        p99: null,
                      }

                      return (
                        <Fragment key={g.key}>
                          {groupByModel && (
                            <TableRow className="bg-muted/40">
                              <TableCell colSpan={5}>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    {g.key === 'all' ? (
                                      <span className="font-medium">{g.title}</span>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <ModelBadge model={g.key as BenchmarkRow['model']} />
                                      </div>
                                    )}

                                    <span className="ml-2 text-xs text-muted-foreground">
                                      n={s.n}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                    <span>
                                      mean{' '}
                                      <span className="font-mono">
                                        {s.mean ? formatMs(s.mean) : '—'}
                                      </span>
                                    </span>
                                    <span>
                                      median{' '}
                                      <span className="font-mono">
                                        {s.med ? formatMs(s.med) : '—'}
                                      </span>
                                    </span>
                                    <span>
                                      std{' '}
                                      <span className="font-mono">
                                        {s.std ? formatMs(s.std) : '—'}
                                      </span>
                                    </span>
                                    <span>
                                      p95{' '}
                                      <span className="font-mono">
                                        {s.p95 ? formatMs(s.p95) : '—'}
                                      </span>
                                    </span>
                                    <span>
                                      p99{' '}
                                      <span className="font-mono">
                                        {s.p99 ? formatMs(s.p99) : '—'}
                                      </span>
                                    </span>
                                    <span>
                                      min/max{' '}
                                      <span className="font-mono">
                                        {s.min ? formatMs(s.min) : '—'} /{' '}
                                        {s.max ? formatMs(s.max) : '—'}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}

                          {g.rows.map((r) => {
                            const v = getMetricValue(r.durationMs, metric)

                            return (
                              <TableRow key={r.id}>
                                <TableCell className="font-mono text-xs">
                                  {formatTime(r.ts)}
                                </TableCell>
                                <TableCell>
                                  <ModelBadge model={r.model} />
                                </TableCell>
                                <TableCell className="font-mono text-xs">{r.backend}</TableCell>
                                <TableCell className="text-right font-mono text-xs">
                                  {v !== null ? formatMs(v) : '—'}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                  {r.prediction ?? '—'}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </Fragment>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-muted-foreground">
                Page <span className="font-medium text-foreground">{pageIndex + 1}</span> of{' '}
                <span className="font-medium text-foreground">{pageCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                  disabled={pageIndex === 0 || filteredAll.length === 0}
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
                  disabled={pageIndex >= pageCount - 1 || filteredAll.length === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
