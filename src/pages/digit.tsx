import { DigitPlayground } from '@/components/digitPlayground/digitPlayground'

export const DigitPage = () => {
  const loadModel = async () => {
    const runner = await WebDNN.load('/models/onxx/digit/')

    // załóżmy, że model to MNIST 28x28x1
    const H = 28
    const W = 28
    const dummy = new Float32Array(H * W) // np. same zera

    const inputTensor = new WebDNN.CPUTensor([1, H, W, 1], 'float32', dummy)
    const [output] = await runner.run([inputTensor])

    console.log('Output:', output.data)
  }

  loadModel()

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-4">
      <DigitPlayground />
    </div>
  )
}
