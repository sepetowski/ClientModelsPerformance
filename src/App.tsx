import { Routes } from './routes/routes'
import { Navbar } from './components/shared/navbar'
import { PageWrapper } from './components/shared/pageWrapper'
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()

export const App = () => {
  setWasmPaths('/wasm/tfjs/')
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <PageWrapper>
        <Routes />
      </PageWrapper>
      <Toaster />
    </QueryClientProvider>
  )
}
