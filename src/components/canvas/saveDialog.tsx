import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'

export interface SaveDialogProps {
  open: boolean
  onConfirm: (filename: string) => void
  onOpenChange: (open: boolean) => void
}

export const SaveDialog = ({ open, onConfirm, onOpenChange }: SaveDialogProps) => {
  const defaultRef = useRef(`canvas-${new Date().toISOString().replace(/[:.]/g, '-')}.png`)
  const [name, setName] = useState(defaultRef.current)

  useEffect(() => {
    if (open) setName(defaultRef.current)
  }, [open])

  const sanitize = (raw: string) => raw.replace(/[\\/:*?"<>|]/g, '_').trim()

  const handleConfirm = () => {
    const base = sanitize(name) || 'canvas'
    const finalName = base.toLowerCase().endsWith('.png') ? base : `${base}.png`
    onConfirm(finalName)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save as PNG</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label htmlFor="filename" className="text-sm font-medium">
            File name
          </label>
          <Input
            id="filename"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="mój-rysunek.png"
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
