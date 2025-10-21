import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Home,
  LogOut,
  User,
  BarChart3,
  Search,
  Menu as MenuIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { to: "/", label: "Home", icon: <Home size={16} /> },
    {
      to: "/facebook-ads",
      label: "Meta Ads",
      icon: <BarChart3 size={16} />,
    },
    { to: "/seo-analysis", label: "SEO Analysis", icon: <Search size={16} /> },
    { to: "/profile", label: "Profile", icon: <User size={16} /> },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        color: "#333",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#2f855a",
              mr: 4,
            }}
          >
            Optivue
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  color: "#333",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&.active": {
                    background: "#0f7b76",
                    color: "#fff",
                    fontWeight: 600,
                  },
                }}
              >
                {item.icon}
                <Typography sx={{ ml: 1, fontSize: "13px", fontWeight: 500 }}>
                  {item.label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            onClick={handleLogout}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1,
              borderRadius: 2,
              backgroundColor: "#dc3545",
              "&:hover": {
                backgroundColor: "#c82333",
              },
            }}
            startIcon={<LogOut size={18} />}
          >
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Logout
            </Typography>
          </Button>

          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "#333" }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                background: "white",
                color: "#333",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.to}
                component={NavLink}
                to={item.to}
                onClick={handleClose}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                {item.icon}
                <Typography sx={{ ml: 1 }}>{item.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
