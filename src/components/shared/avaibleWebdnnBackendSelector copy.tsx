import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { twMerge } from 'tailwind-merge'
import type { AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import { AVAIBLE_WEBDNN_BACKENDS_OPTIONS } from '@/const/avaibleWebdnnBackends'

interface AvaibleSelectorProps {
  backend: AvaibleWebdnnBackendType
  onChange: (backend: AvaibleWebdnnBackendType) => void
  disabled?: boolean
  className?: string
  label?: string
}

export const AvaibleWebdnnBackendSelector = ({
  backend,
  onChange,
  disabled = false,
  className = '',
  label = 'WebDNN Backend',
}: AvaibleSelectorProps) => {
  return (
    <div className={twMerge('flex items-center gap-3 text-xs text-muted-foreground', className)}>
      <span>{label}:</span>
      <Select
        value={backend}
        onValueChange={(value) => onChange(value as AvaibleWebdnnBackendType)}
        disabled={disabled}
      >
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue placeholder="Choose backend" />
        </SelectTrigger>
        <SelectContent>
          {AVAIBLE_WEBDNN_BACKENDS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
