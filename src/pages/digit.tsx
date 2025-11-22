import { DigitPlayground } from '@/components/digitPlayground/digitPlayground'

export const DigitPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Digit Recognition</h1>
      <p className="text-sm text-muted-foreground">
        Draw a digit on the canvas, choose a backend, and see what the model predicts.
      </p>
      <DigitPlayground />
    </div>
  )
}
