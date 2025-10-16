import { ReactNode } from 'react'
import { Typography, Box } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from './Sidebar'
import {
  StyledAppBar,
  StyledToolbar,
  AppTitle,
  NavButton,
  MainContent,
  SidebarWrapper
} from '../styles/Layout.styles'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // hide header for dashboard (/) and profile pages per request
  const hideHeaderPaths = ['/', '/profile']
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname)

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated && (
        <SidebarWrapper component="aside">
          <Sidebar />
        </SidebarWrapper>
      )}

      <MainContent component="main">
        {!shouldHideHeader && (
          <StyledAppBar>
            <StyledToolbar>
              <AppTitle variant="h6">
                OptiVue
              </AppTitle>
              {isAuthenticated && (
                <>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <NavButton>Home</NavButton>
                  </Link>
                  <Link to="/about" style={{ textDecoration: 'none' }}>
                    <NavButton>About</NavButton>
                  </Link>
                  <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <NavButton>Profile</NavButton>
                  </Link>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <Typography variant="body1" sx={{ mr: 2, color: 'white' }}>
                    Welcome, {user?.username}
                  </Typography>
                  <NavButton onClick={handleLogout}>
                    Logout
                  </NavButton>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <NavButton>Login</NavButton>
                  </Link>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <NavButton>Sign Up</NavButton>
                  </Link>
                </>
              )}
            </StyledToolbar>
          </StyledAppBar>
        )}

        <Box sx={{ padding: '24px', width: '100%' }}>
          {children}
        </Box>
      </MainContent>
    </Box>
  )
}

export default Layout