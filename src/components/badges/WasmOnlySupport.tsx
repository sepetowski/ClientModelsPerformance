import { Badge } from '@/components/ui/badge'
import { AlertCircle } from 'lucide-react'

export const WasmOnlySupport = () => {
  return (
    <Badge>
      <AlertCircle />
      Onxx supports only WASM
    </Badge>
  )
}
