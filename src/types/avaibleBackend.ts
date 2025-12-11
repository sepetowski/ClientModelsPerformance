import type { AVAIBLE_WEBDNN_BACKENDS } from '@/const/avaibleWebdnnBackends'
import type { AVAIBLE_TENSORFLOW_BACKENDS } from '@/const/avaibleTensorflowBackends'

export type AvaibleWebdnnBackendType =
  (typeof AVAIBLE_WEBDNN_BACKENDS)[keyof typeof AVAIBLE_WEBDNN_BACKENDS]
export type AvaibleTensorflowBackendType =
  (typeof AVAIBLE_TENSORFLOW_BACKENDS)[keyof typeof AVAIBLE_TENSORFLOW_BACKENDS]
