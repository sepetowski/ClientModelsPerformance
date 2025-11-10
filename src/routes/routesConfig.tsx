import { Home } from '@/pages/home'
import { CanvasPage } from '@/pages/canvas'
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
    path: '/canvas',
    name: 'Canvas',
    element: <CanvasPage />,
  },
]
