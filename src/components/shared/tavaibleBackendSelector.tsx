import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { twMerge } from 'tailwind-merge'
import type { AvaibleBackendType } from '@/types/avaibleBackend'
import { AVAIBLE_BACKENDS_OPTIONS } from '@/const/avaibleBackends'

interface AvaibleSelectorProps {
  backend: AvaibleBackendType
  onChange: (backend: AvaibleBackendType) => void
  disabled?: boolean
  className?: string
  label?: string
}

export const AvaibleBackendSelector = ({
  backend,
  onChange,
  disabled = false,
  className = '',
  label = 'Backend',
}: AvaibleSelectorProps) => {
  return (
    <div className={twMerge('flex items-center gap-3 text-xs text-muted-foreground', className)}>
      <span>{label}:</span>
      <Select
        value={backend}
        onValueChange={(value) => onChange(value as AvaibleBackendType)}
        disabled={disabled}
      >
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue placeholder="Choose backend" />
        </SelectTrigger>
        <SelectContent>
          {AVAIBLE_BACKENDS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
