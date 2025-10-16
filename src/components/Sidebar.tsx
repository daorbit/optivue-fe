import React from 'react'
import { ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material'
import { Home, LogOut, UserIcon } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  SidebarContainer,
  NavigationList
} from '../styles/Sidebar.styles'

const Sidebar: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/profile', label: 'Profile', icon: <UserIcon size={18} /> },
  ]

  return (
    <SidebarContainer>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f7b76', mb: 2 }}>
        Optivue
      </Typography>
      <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.04)' }} />

      <NavigationList>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </NavLink>
        ))}
        <Box
          className="nav-item logout-item"
          onClick={handleLogout}
          sx={{ cursor: 'pointer', mt: 'auto' }}
        >
          <ListItemIcon>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </Box>
      </NavigationList>
    </SidebarContainer>
  )
}

export default Sidebar
