import { toast } from 'sonner'
import type { PredictResult } from '@/types/PredictResult'

export const useShowPredictError = () => {
  const showError = (result: PredictResult | null, context?: string) => {
    if (!result || !result.hasError) return

    const mg =
      result.errorMessage &&
      result.errorMessage.includes('Operator implementation for Clip, opset=13 does not exist.')
        ? 'WebDNN backend not support this model'
        : result.errorMessage

    toast.error(context ? `${context} error` : 'Prediction error', {
      description: mg ?? 'Unknown error',
    })
  }

  const showErrors = (results: Array<{ result: PredictResult; context?: string }>) => {
    results.forEach(({ result, context }) => showError(result, context))
  }

  return {
    showError,
    showErrors,
  }
}
