import { ComponentType } from 'react'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import VerifyOtp from './components/VerifyOtp'
import Profile from './components/Profile'
import FacebookAdsDashboard from './components/FacebookAdsDashboard'
import SeoAnalysis from './components/seo/SeoAnalysis'

interface RouteConfig {
  path: string
  component: ComponentType
}

export const publicRoutes: RouteConfig[] = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/verify-otp', component: VerifyOtp },
]

export const privateRoutes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
  { path: '/facebook-ads', component: FacebookAdsDashboard },
  { path: '/seo-analysis', component: SeoAnalysis },
]