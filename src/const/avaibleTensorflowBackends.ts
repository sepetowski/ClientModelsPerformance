export const AVAIBLE_TENSORFLOW_BACKENDS = {
  WEBGL: 'webgl',
  WASM: 'wasm',
  CPU: 'cpu',
} as const

export const AVAIBLE_TENSORFLOW_BACKENDS_OPTIONS = [
  { value: AVAIBLE_TENSORFLOW_BACKENDS.WEBGL, label: 'WebGL' },
  { value: AVAIBLE_TENSORFLOW_BACKENDS.WASM, label: 'WASM' },
  { value: AVAIBLE_TENSORFLOW_BACKENDS.CPU, label: 'CPU' },
] as const
