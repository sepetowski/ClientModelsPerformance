import { TENSORFLOW_BACKEND_OPTIONS } from '@/const/tensorFlowBackend'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { twMerge } from 'tailwind-merge'
import type { TensorFlowBackendType } from '@/types/tensorFlowBackend'

interface TensorFlowBackendSelectorProps {
  backend: TensorFlowBackendType
  onChange: (backend: TensorFlowBackendType) => void
  disabled?: boolean
  className?: string
  label?: string
}

export const TensorFlowBackendSelector = ({
  backend,
  onChange,
  disabled = false,
  className = '',
  label = 'Backend',
}: TensorFlowBackendSelectorProps) => {
  return (
    <div className={twMerge('flex items-center gap-3 text-xs text-muted-foreground', className)}>
      <span>{label}:</span>
      <Select
        value={backend}
        onValueChange={(value) => onChange(value as TensorFlowBackendType)}
        disabled={disabled}
      >
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue placeholder="Wybierz backend" />
        </SelectTrigger>
        <SelectContent>
          {TENSORFLOW_BACKEND_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
