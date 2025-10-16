import { ReactNode } from 'react'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OptiVue
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        {/* Add more nav items as needed */}
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {children}
    </Container>
  </>
)

export default Layout