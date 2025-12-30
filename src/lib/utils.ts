import type { Stats } from '@/types/benchmark'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMs(ms: number): string {
  return `${ms.toFixed(1)} ms`
}

export function formatTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!
}

export function p95(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const idx = Math.ceil(0.95 * sorted.length) - 1
  return sorted[Math.max(0, Math.min(sorted.length - 1, idx))]!
}

export function mean(values: number[]): number | null {
  if (values.length === 0) return null
  return values.reduce((a, b) => a + b, 0) / values.length
}

export function stdDev(values: number[]): number | null {
  if (values.length === 0) return null
  const m = mean(values)!
  const variance = values.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / values.length
  return Math.sqrt(variance)
}

export function min(values: number[]): number | null {
  return values.length ? Math.min(...values) : null
}

export function max(values: number[]): number | null {
  return values.length ? Math.max(...values) : null
}

export function p99(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const idx = Math.ceil(0.99 * sorted.length) - 1
  return sorted[Math.max(0, Math.min(sorted.length - 1, idx))]!
}

export function numOrInf(x: number | null): number {
  return x ?? Number.POSITIVE_INFINITY
}

export function compareStats(a: Stats, b: Stats): number {
  const keys: Array<(s: Stats) => number> = [
    (s) => numOrInf(s.med),
    (s) => numOrInf(s.p95),
    (s) => numOrInf(s.mean),
    (s) => numOrInf(s.std),
  ]

  for (const k of keys) {
    const da = k(a)
    const db = k(b)
    if (da !== db) return da - db
  }

  // więcej próbek = lepiej (odwrócone)
  return b.n - a.n
}
