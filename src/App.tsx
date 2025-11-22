import { Routes } from './routes/routes'
import { Navbar } from './components/shared/navbar'
import { PageWrapper } from './components/shared/pageWrapper'
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm'

export const App = () => {
  setWasmPaths('/wasm/')

  return (
    <>
      <Navbar />
      <PageWrapper>
        <Routes />
      </PageWrapper>
    </>
  )
}
