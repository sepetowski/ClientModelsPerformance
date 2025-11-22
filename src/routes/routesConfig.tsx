import { Home } from '@/pages/home'
import { DigitPage } from '@/pages/digit'
import type { JSX } from 'react'

export interface AppRoute {
  path: string
  name: string
  element: JSX.Element
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  {
    path: '/digit',
    name: 'Digit',
    element: <DigitPage />,
  },
]
