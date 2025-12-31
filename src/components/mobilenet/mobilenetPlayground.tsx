import { useState } from 'react'
import { BenchmarkTable, type BenchmarkRow } from '../benchmark/benchmarkTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { AvaibleTensorflowBackendSelector } from '../shared/avaibleTensorflowBackendSelector'
import { AvaibleWebdnnBackendSelector } from '../shared/avaibleWebdnnBackendSelector copy'
import { WasmOnlySupport } from '../badges/WasmOnlySupport'
import { AVAIBLE_TENSORFLOW_BACKENDS } from '@/const/avaibleTensorflowBackends'
import { AVAIBLE_WEBDNN_BACKENDS } from '@/const/avaibleWebdnnBackends'
import type { AvaibleTensorflowBackendType, AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import { ImagePiceker } from './imagePiceker'
import { Card, CardContent } from '../ui/card'
import { useTensorflowMobilenetModel } from '@/hooks/tensorflow/useTensorflowMobilenetModel'
import { runMeasured } from '@/lib/runMeasure'
import { Button } from '../ui/button'
import { useOnnxMobilenetModel } from '@/hooks/onxx/useOnnxMobilenetModel'
import { ResultsList } from './resultsList'
import { Separator } from '../ui/separator'
import { useWebDnnMobilenetModel } from '@/hooks/webDnn/useWebDnnMobilenetModel'

const MAX_K = 5

export const MobilenetPlayground = () => {
  const [rows, setRows] = useState<BenchmarkRow[]>([])
  const [runningAll, setRunningAll] = useState(false)

  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null)

  const [tensorflowbackend, setTensorflowBackend] = useState<AvaibleTensorflowBackendType>(
    AVAIBLE_TENSORFLOW_BACKENDS.CPU
  )

  const [webdnnBackend, setWebdnnBackend] = useState<AvaibleWebdnnBackendType>(
    AVAIBLE_WEBDNN_BACKENDS.CPU
  )

  const {
    ready: tfReady,
    loadingModel: tfLoading,
    predicting: tfPredicting,
    prediction: tfPrediction,
    predictFromImage: tfPredictFromImage,
    topK: tfTopK,
  } = useTensorflowMobilenetModel(tensorflowbackend)

  const {
    ready: webdnnReady,
    loadingModel: webdnnLoading,
    predicting: webdnnPredicting,
    prediction: webdnnPrediction,
    predictFromImage: webdnnPredictFromImage,
    topK: webdnnTopK,
  } = useWebDnnMobilenetModel(webdnnBackend)

  const {
    ready: onnxReady,
    loadingModel: onnxLoading,
    predicting: onnxPredicting,
    prediction: onnxPrediction,
    predictFromImage: onnxPredictFromImage,
    topK: onnxTopK,
  } = useOnnxMobilenetModel()

  const handlePredictClick = async () => {
    if (imgEl === null) return
    setRunningAll(true)

    try {
      const tfRow = await runMeasured(
        'TF',
        tensorflowbackend,
        () => tfPredictFromImage(imgEl, MAX_K),
        (res) => (typeof res === 'string' ? res : null)
      )
      setRows((r) => [tfRow, ...r])

      const onnxRow = await runMeasured(
        'ONNX',
        'wasm',
        () => onnxPredictFromImage(imgEl, MAX_K),
        (res) => (typeof res === 'string' ? res : null)
      )
      setRows((r) => [onnxRow, ...r])

      const webdnnRow = await runMeasured(
        'WebDNN',
        webdnnBackend,
        () => webdnnPredictFromImage(imgEl, MAX_K),
        (res) => (typeof res === 'string' ? res : null)
      )
      setRows((r) => [webdnnRow, ...r])
    } catch (e: any) {
      const msg = String(e?.message ?? e)
      if (msg.includes('Operator implementation for Clip')) {
        alert(' Operator implementation for Clip, opset=13 does not exist.')
      } else {
        alert(`Error during prediction: ${msg}`)
      }
    } finally {
      setRunningAll(false)
    }
  }

  const isButtonDisabled =
    !tfReady ||
    !onnxReady ||
    !webdnnReady ||
    imgEl === null ||
    tfLoading ||
    onnxLoading ||
    webdnnLoading ||
    tfPredicting ||
    onnxPredicting ||
    webdnnPredicting ||
    runningAll

  return (
    <Tabs defaultValue="mobilenet">
      <TabsList>
        <TabsTrigger value="mobilenet">Mobilenet playground</TabsTrigger>
        <TabsTrigger value="table">Table</TabsTrigger>
      </TabsList>

      <TabsContent value="mobilenet" className="space-y-6 mt-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Mobilenet v2 model benchmark</h1>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus, officia.
          </p>
        </header>

        <Card>
          <CardContent>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <AvaibleTensorflowBackendSelector
                  backend={tensorflowbackend}
                  onChange={(e) => setTensorflowBackend(e)}
                  disabled={tfPredicting || runningAll || tfLoading}
                  className="min-w-[220px]"
                />
                <AvaibleWebdnnBackendSelector
                  backend={webdnnBackend}
                  onChange={(e) => setWebdnnBackend(e)}
                  disabled={tfPredicting || runningAll || tfLoading}
                  className="min-w-[220px]"
                />
                <WasmOnlySupport />
              </div>
              {(tfLoading || onnxLoading || webdnnLoading) && (
                <div className="text-xs text-muted-foreground">
                  {tfLoading && onnxLoading && webdnnLoading
                    ? 'Loading TensorFlow, ONNX and WebDNN models...'
                    : tfLoading
                      ? 'Loading TensorFlow model...'
                      : onnxLoading
                        ? 'Loading ONNX model...'
                        : 'Loading WebDNN model...'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <section className="flex gap-4 flex-col lg:flex-row">
          <div className="lg:w-4/6">
            <ImagePiceker onImageLoaded={(img) => setImgEl(img)} />
          </div>
          <Card className="lg:w-2/6">
            <CardContent>
              <div className="w-full">
                <Button
                  type="button"
                  variant={'outline'}
                  className="w-full"
                  onClick={handlePredictClick}
                  disabled={isButtonDisabled}
                >
                  Predict (TF + ONXX + WebDNN)
                </Button>
                <span className="text-xs text-muted-foreground text-center">
                  Select image and click &quot;Recognize (TF + ONNX + WebDNN)&quot; to run
                  predictions.
                </span>
              </div>

              {(tfTopK.length > 0 || onnxTopK.length > 0) && (
                <div className="mt-4 text-sm">
                  <div className="mt-4 space-y-4">
                    <ResultsList title="TensorFlow results" items={tfTopK} />

                    <Separator />
                    <ResultsList title="ONNX results" items={onnxTopK} />

                    <Separator />
                    <ResultsList title="WebDNN results" items={webdnnTopK} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </TabsContent>
      <TabsContent value="table" className="mt-6">
        <BenchmarkTable rows={rows} />
      </TabsContent>
    </Tabs>
  )
}
