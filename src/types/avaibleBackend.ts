import type { AVAIBLE_BACKENDS } from '@/const/avaibleBackends'

export type AvaibleBackendType = (typeof AVAIBLE_BACKENDS)[keyof typeof AVAIBLE_BACKENDS]
