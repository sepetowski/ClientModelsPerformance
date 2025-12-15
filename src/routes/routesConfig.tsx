import { EmnistPage } from '@/pages/emnist'
import { Home } from '@/pages/home'
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
    path: '/emnist',
    name: 'Emnist',
    element: <EmnistPage />,
  },
]
