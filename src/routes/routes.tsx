import { Routes as R, Route } from 'react-router-dom'
import { appRoutes } from './routesConfig'

export const Routes = () => {
  return (
    <R>
      {appRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </R>
  )
}
