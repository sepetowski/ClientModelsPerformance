import type { TENSORFLOW_BACKENDS } from '@/const/tensorFlowBackend'

export type TensorFlowBackendType = (typeof TENSORFLOW_BACKENDS)[keyof typeof TENSORFLOW_BACKENDS]
