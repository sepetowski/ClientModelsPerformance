import { Link, useLocation } from 'react-router-dom'
import { appRoutes } from '@/routes/routesConfig'
import { Button } from '@/components/ui/button'
export function Navbar() {
  const location = useLocation()

  return (
    <nav className="w-full border-b bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <span className="text-xl font-semibold tracking-tight">
          <Link to="/">Client Models</Link>
        </span>
        <div className="flex gap-2">
          {appRoutes
            .filter((p) => p.path !== '/')
            .map(({ path, name }) => (
              <Button key={path} asChild variant={location.pathname === path ? 'default' : 'ghost'}>
                <Link to={path}>{name}</Link>
              </Button>
            ))}
        </div>
      </div>
    </nav>
  )
}
