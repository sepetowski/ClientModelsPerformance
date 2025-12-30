import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

export const ImagePiceker = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUrl('')
    const blobUrl = URL.createObjectURL(file)
    setPreviewSrc(blobUrl)
  }

  function onLoadUrl() {
    const url = imageUrl.trim()
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
  }

  function onImgLoad() {
    if (previewSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(previewSrc)
    }
  }

  function onImgError() {
    setPreviewSrc(null)
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
                src={previewSrc}
                alt="preview"
                onLoad={onImgLoad}
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
