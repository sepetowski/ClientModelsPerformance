import { Routes } from './routes/routes'
import { Navbar } from './components/shared/navbar'
import { PageWrapper } from './components/shared/pageWrapper'

export const App = () => {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Routes />
      </PageWrapper>
    </>
  )
}
