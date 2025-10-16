import { ComponentType } from 'react'
import Home from './components/Home'
import About from './components/About'

interface RouteConfig {
  path: string
  component: ComponentType
}

export const publicRoutes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

export const privateRoutes: RouteConfig[] = [
  // Add private routes here, e.g., { path: '/dashboard', component: Dashboard }
]