export const TENSORFLOW_BACKENDS = {
  WEBGL: 'webgl',
  WASM: 'wasm',
  CPU: 'cpu',
} as const

export const TENSORFLOW_BACKEND_OPTIONS = [
  { value: TENSORFLOW_BACKENDS.WEBGL, label: 'WebGL' },
  { value: TENSORFLOW_BACKENDS.WASM, label: 'WASM' },
  { value: TENSORFLOW_BACKENDS.CPU, label: 'CPU' },
] as const
