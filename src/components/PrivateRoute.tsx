import { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

interface PrivateRouteProps {
  component: ComponentType
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Component />
}

export default PrivateRoute