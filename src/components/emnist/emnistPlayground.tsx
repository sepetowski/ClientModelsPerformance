import { useRef, useState } from 'react'
import { Canvas } from '@/components/canvas/canvas'
import type { AvaibleTensorflowBackendType, AvaibleWebdnnBackendType } from '@/types/avaibleBackend'
import { WasmOnlySupport } from '../badges/WasmOnlySupport'
import { AvaibleTensorflowBackendSelector } from '../shared/avaibleTensorflowBackendSelector'
import { AVAIBLE_WEBDNN_BACKENDS } from '@/const/avaibleWebdnnBackends'
import { AVAIBLE_TENSORFLOW_BACKENDS } from '@/const/avaibleTensorflowBackends'
import { AvaibleWebdnnBackendSelector } from '../shared/avaibleWebdnnBackendSelector copy'
import { useTensorflowEmnistModel } from '@/hooks/tensorflow/useTensorflowEmnistModel'
import { useWebDnnEmnistModel } from '@/hooks/webDnn/useWebDnnEmnistModel'
import { useOnnxEmnistModel } from '@/hooks/onxx/useOnnxEmnistModel'
import type { BenchmarkRow } from '@/types/benchmark'
import { BenchmarkTable } from '../benchmark/benchmarkTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { predictResultToBenchmarkRow } from '@/lib/predictResultToBenchmarkRow'
import { useShowPredictError } from '@/hooks/useShowPredictError'

export const EmnistPlayground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { showErrors } = useShowPredictError()

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
    predictFromCanvas: tfPredictFromCanvas,
  } = useTensorflowEmnistModel(tensorflowbackend)

  const {
    ready: webdnnReady,
    loadingModel: webdnnLoading,
    predicting: webdnnPredicting,
    prediction: webdnnPrediction,
    predictFromCanvas: webdnnPredictFromCanvas,
  } = useWebDnnEmnistModel(webdnnBackend)

  const {
    ready: onnxReady,
    loadingModel: onnxLoading,
    predicting: onnxPredicting,
    prediction: onnxPrediction,
    predictFromCanvas: onnxPredictFromCanvas,
  } = useOnnxEmnistModel()

  const [runningAll, setRunningAll] = useState(false)
  const [rows, setRows] = useState<BenchmarkRow[]>([])
  const [canvasEmpty, setCanvasEmpty] = useState(true)

  const handleEmptyChange = (isEmpty: boolean) => {
    setCanvasEmpty(isEmpty)
  }

  const handlePredictClick = async () => {
    if (!canvasRef.current) return
    setRunningAll(true)

    const canvas = canvasRef.current

    const tfData = await tfPredictFromCanvas(canvas)
    const onnxData = await onnxPredictFromCanvas(canvas)
    const webdnnData = await webdnnPredictFromCanvas(canvas)

    showErrors([
      { result: tfData, context: 'TensorFlow.js' },
      { result: onnxData, context: 'ONNX Runtime' },
      { result: webdnnData, context: 'WebDNN' },
    ])

    const newRows: BenchmarkRow[] = [
      predictResultToBenchmarkRow(tfData, tensorflowbackend, 'TF'),
      predictResultToBenchmarkRow(onnxData, 'wasm', 'ONNX'),
      predictResultToBenchmarkRow(webdnnData, webdnnBackend, 'WebDNN'),
    ]

    setRows((r) => [...newRows, ...r])
    setRunningAll(false)
  }
  const isButtonDisabled =
    !canvasRef.current ||
    !tfReady ||
    !onnxReady ||
    !webdnnReady ||
    tfLoading ||
    onnxLoading ||
    webdnnLoading ||
    tfPredicting ||
    onnxPredicting ||
    webdnnPredicting ||
    canvasEmpty ||
    runningAll

  let buttonLabel: string
  if (tfLoading || onnxLoading || webdnnLoading) {
    buttonLabel = 'Loading models...'
  } else if (runningAll || tfPredicting || onnxPredicting || webdnnPredicting) {
    buttonLabel = 'Running...'
  } else {
    buttonLabel = 'Recognize (TF + ONNX + WebDNN)'
  }

  const allPredicted = tfPrediction !== null && onnxPrediction !== null && webdnnPrediction !== null

  return (
    <Tabs defaultValue="emnist">
      <TabsList>
        <TabsTrigger value="emnist">Emnist playground</TabsTrigger>
        <TabsTrigger value="table">Table</TabsTrigger>
      </TabsList>

      <TabsContent value="emnist" className="space-y-6 mt-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Emnist model benchmark</h1>
          <p className="text-sm text-muted-foreground">
            Draw digit (0-9) or letter (a-z/A-Z) on the canvas, then compare predictions from
            TensorFlow, ONNX and WebDNN models in the browser.
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

        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-2">
                <Button
                  disabled={isButtonDisabled}
                  onClick={handlePredictClick}
                  variant={'outline'}
                >
                  {buttonLabel}
                </Button>

                <span className="text-xs text-muted-foreground">
                  Draw and click &quot;Recognize (TF + ONNX + WebDNN)&quot; to run predictions.
                </span>
              </div>

              <div className="min-h-[40px] text-sm md:text-right">
                {allPredicted && (
                  <div className="flex flex-col gap-1 md:items-end">
                    <span>
                      TF model predicts: <span className="font-semibold">{tfPrediction}</span>
                    </span>
                    <span>
                      ONNX model predicts: <span className="font-semibold">{onnxPrediction}</span>
                    </span>
                    <span>
                      WebDNN model predicts:{' '}
                      <span className="font-semibold">{webdnnPrediction}</span>
                    </span>
                  </div>
                )}

                {!allPredicted && (tfLoading || onnxLoading || webdnnLoading) && (
                  <span className="text-xs text-muted-foreground">
                    Models are loading, please wait a moment…
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">Drawing canvas</h2>
          </CardHeader>
          <CardContent>
            <Canvas
              canvasRefExternal={canvasRef}
              onEmptyChange={handleEmptyChange}
              className="mt-0"
              background="#ffffff"
              initialColor="#111827"
              initialSize={8}
              height={520}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="table" className="mt-6">
        <BenchmarkTable rows={rows} />
      </TabsContent>
    </Tabs>
  )
}
