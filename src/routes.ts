import { ComponentType } from 'react'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'

interface RouteConfig {
  path: string
  component: ComponentType
}

export const publicRoutes: RouteConfig[] = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
]

export const privateRoutes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]