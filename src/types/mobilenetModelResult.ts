export type MobilenetTopItem = {
  index: number
  label: string
  prob: number
}

export type MobilenetModelResult = {
  ready: boolean
  loadingModel: boolean
  predicting: boolean
  prediction: string | null
  topK: MobilenetTopItem[]
  predictFromImage: (img: HTMLImageElement | null, k?: number) => Promise<string | null>
}
