import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const PageWrapper = ({ children }: Props) => {
  return <main className="w-full mx-auto max-w-7xl p-4">{children}</main>
}
