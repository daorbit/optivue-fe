import { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { CircularProgress, Box } from '@mui/material'

interface PrivateRouteProps {
  component: ComponentType
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Component />
}

export default PrivateRoute