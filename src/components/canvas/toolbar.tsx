import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Brush,
  Eraser,
  RotateCcw,
  RotateCw,
  Download,
  Trash2,
  PaintBucket,
  Circle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PRESET_COLORS } from '@/const/paintColors'

interface Props {
  brushSize: number
  setBrushSize: (n: number) => void
  brushColor: string
  setBrushColor: (c: string) => void
  isEraser: boolean
  setIsEraser: (v: boolean) => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  onDownload: () => void
}

export const Toolbar = ({
  brushSize,
  setBrushSize,
  brushColor,
  setBrushColor,
  isEraser,
  setIsEraser,
  onUndo,
  onRedo,
  onClear,
  onDownload,
}: Props) => {
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 mb-3 flex flex-wrap items-center gap-2 rounded-2xl bg-white/70 backdrop-blur p-2 shadow-sm border"
      >
        <div className="flex items-center gap-2 pr-2 border-r">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isEraser ? 'ghost' : 'default'}
                size="icon"
                className={isEraser ? 'opacity-60' : ''}
                onClick={() => setIsEraser(false)}
              >
                <Brush className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Brush</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isEraser ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setIsEraser(true)}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Eraser</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 pr-2 border-r">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <span className="h-4 w-4 rounded-full border" style={{ background: brushColor }} />
                Color
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-6 gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setBrushColor(c)}
                    className="h-7 w-7 rounded-full border shadow-sm"
                    style={{ background: c }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <Label htmlFor="color-input">Custom</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="color-input"
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="h-9 p-1"
                  />
                  <Input
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-3 w-56">
            <Label className="whitespace-nowrap">Size</Label>
            <Slider
              value={[brushSize]}
              min={1}
              max={64}
              step={1}
              onValueChange={(v) => setBrushSize(v[0])}
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground w-12">
              <Circle className="h-3 w-3" />
              <span>{brushSize}px</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onUndo}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl/Cmd+Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onRedo}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl/Cmd+Shift+Z)</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <PaintBucket className="h-4 w-4" />
                Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onClear}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDownload}>
                <Download className="mr-2 h-4 w-4" /> Save PNG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}
