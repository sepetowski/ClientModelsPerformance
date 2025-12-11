export const AVAIBLE_WEBDNN_BACKENDS = {
  WEBGL: 'webgl',
  CPU: 'cpu',
} as const

export const AVAIBLE_WEBDNN_BACKENDS_OPTIONS = [
  { value: AVAIBLE_WEBDNN_BACKENDS.WEBGL, label: 'WebGL' },
  { value: AVAIBLE_WEBDNN_BACKENDS.CPU, label: 'CPU' },
] as const
