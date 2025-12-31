import { EmnistPage } from '@/pages/emnist'
import { Home } from '@/pages/home'
import { MobilenetPage } from '@/pages/mobilenet'
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
  {
    path: '/mobilenet',
    name: 'MobileNet',
    element: <MobilenetPage />,
  },
]
