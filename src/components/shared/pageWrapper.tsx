import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const PageWrapper = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-7xl">{children}</div>
    </main>
  )
}
