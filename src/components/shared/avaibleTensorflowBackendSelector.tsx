import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { twMerge } from 'tailwind-merge'
import type { AvaibleTensorflowBackendType } from '@/types/avaibleBackend'
import { AVAIBLE_TENSORFLOW_BACKENDS_OPTIONS } from '@/const/avaibleTensorflowBackends'

interface AvaibleSelectorProps {
  backend: AvaibleTensorflowBackendType
  onChange: (backend: AvaibleTensorflowBackendType) => void
  disabled?: boolean
  className?: string
  label?: string
}

export const AvaibleTensorflowBackendSelector = ({
  backend,
  onChange,
  disabled = false,
  className = '',
  label = 'TensorFlow.js Backend',
}: AvaibleSelectorProps) => {
  return (
    <div className={twMerge('flex items-center gap-3 text-xs text-muted-foreground', className)}>
      <span>{label}:</span>
      <Select
        value={backend}
        onValueChange={(value) => onChange(value as AvaibleTensorflowBackendType)}
        disabled={disabled}
      >
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue placeholder="Choose backend" />
        </SelectTrigger>
        <SelectContent>
          {AVAIBLE_TENSORFLOW_BACKENDS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
