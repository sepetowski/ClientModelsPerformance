import { useRef, useState, type ChangeEvent } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

interface Props {
  onImageLoaded?: (img: HTMLImageElement | null) => void
}

export const ImagePiceker = ({ onImageLoaded }: Props) => {
  const [imageUrl, setImageUrl] = useState('')
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUrl('')
    const blobUrl = URL.createObjectURL(file)
    setPreviewSrc(blobUrl)
  }

  async function onLoadUrl() {
    const url = await urlToBlobObjectUrl(imageUrl.trim())
    if (!url) {
      return
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    setPreviewSrc(url)
  }

  function onRemove() {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    setImageUrl('')
    setPreviewSrc(null)
    onImageLoaded?.(null)
  }
  async function urlToBlobObjectUrl(url: string) {
    const res = await fetch(url, { mode: 'cors' })
    if (!res.ok) throw new Error('Failed to fetch image')
    const blob = await res.blob()
    return URL.createObjectURL(blob)
  }

  function onImgLoad() {
    if (previewSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(previewSrc)
    }

    onImageLoaded?.(imgRef.current)
  }

  function onImgError() {
    setPreviewSrc(null)
    onImageLoaded?.(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pick an image</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="mt-1 grid w-full grid-cols-[1fr_auto_2fr] items-start gap-4 text-sm">
          <section>
            <div className="grid items-center gap-3">
              <Label htmlFor="picture">Picture</Label>
              <Input
                ref={fileInputRef}
                id="picture"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
            </div>
          </section>

          <Separator orientation="vertical" />

          <section className="space-y-3">
            <Label htmlFor="url">Image URL</Label>
            <div className="flex gap-4">
              <Input
                id="url"
                placeholder="https://example.com/photo.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <div className="flex gap-2">
                <Button type="button" onClick={onLoadUrl}>
                  Load
                </Button>
                {previewSrc && (
                  <Button type="button" variant="secondary" onClick={onRemove}>
                    Remove image
                  </Button>
                )}
              </div>
            </div>
          </section>
        </div>

        {previewSrc && (
          <>
            <Separator />
            <section className="space-y-2">
              <Label>Preview</Label>
              <img
                ref={imgRef}
                src={previewSrc}
                alt="preview"
                onLoad={onImgLoad}
                crossOrigin="anonymous"
                onError={onImgError}
                className="w-full rounded-lg border object-contain max-h-[420px]"
              />
            </section>
          </>
        )}
      </CardContent>
    </Card>
  )
}
