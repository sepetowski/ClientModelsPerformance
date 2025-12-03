export const AVAIBLE_BACKENDS = {
  WEBGL: 'webgl',
  WASM: 'wasm',
  CPU: 'cpu',
} as const

export const AVAIBLE_BACKENDS_OPTIONS = [
  { value: AVAIBLE_BACKENDS.WEBGL, label: 'WebGL' },
  { value: AVAIBLE_BACKENDS.WASM, label: 'WASM' },
  { value: AVAIBLE_BACKENDS.CPU, label: 'CPU' },
] as const
