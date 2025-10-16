import { ComponentType } from 'react'

// Placeholder for authentication check
const isAuthenticated = false // Replace with actual auth logic

interface PrivateRouteProps {
  component: ComponentType
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  // If not authenticated, redirect to login or show message
  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div> // Or <Navigate to="/login" />
  }
  return <Component />
}

export default PrivateRoute