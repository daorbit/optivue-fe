import React, { useState } from 'react'
import { ListItemIcon, ListItemText, Divider, Typography, Box, IconButton } from '@mui/material'
import { Home, LogOut, UserIcon, PanelLeftClose, PanelLeftOpen, BarChart3 } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import {
  SidebarContainer,
  NavigationList
} from '../styles/Sidebar.styles'

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle?.(newCollapsed);
  }

  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/facebook-ads', label: 'Facebook Ads', icon: <BarChart3 size={18} /> },
    { to: '/profile', label: 'Profile', icon: <UserIcon size={18} /> },
  ]

  return (
    <SidebarContainer collapsed={isCollapsed}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', mb: 2 }}>
        {!isCollapsed && (
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f7b76' }}>
            Optivue
          </Typography>
        )}
        <IconButton onClick={toggleCollapse} size="small" sx={{ color: '#0f7b76' }}>
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.04)' }} />

      <NavigationList collapsed={isCollapsed}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={item.label} />}
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
          {!isCollapsed && <ListItemText primary="Logout" />}
        </Box>
      </NavigationList>
    </SidebarContainer>
  )
}

export default Sidebar
