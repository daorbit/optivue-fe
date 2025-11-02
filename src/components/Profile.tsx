import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { refreshUser } from "../store/slices/authSlice";
import { apiService } from "../services/api";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Grid,
  Avatar,
  Chip,
  Button,
  IconButton,
  Paper,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  LinearProgress,
  Fade,
  Slide,
} from "@mui/material";
import { 
  Activity, 
  Trash2, 
  Plus, 
  BarChart3, 
  Search, 
  Settings,
  Shield,
  Bell,
  Edit3,
  Check,
  X,
  Camera,
  Mail,
  Calendar,
  Globe,
  Zap,
  User
} from "lucide-react";
import AddApplicationDialog from "./profile/AddApplicationDialog";
import { useMetaTags } from "../utils/useMetaTags";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    applications: [] as Array<{
      category: string;
      type: string;
      label: string;
      configuration: any;
    }>,
  });
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const metaTags = useMetaTags({
    title: "Your Profile - OptiVue Account Settings",
    description: "Manage your OptiVue account settings, applications, and preferences. Configure your SEO analysis tools and Facebook Ads integrations.",
    keywords: "profile, account settings, OptiVue dashboard, user preferences, application configuration",
    ogTitle: "OptiVue Profile - Manage Your Account",
    ogDescription: "Access your OptiVue profile to configure applications, manage settings, and optimize your digital marketing tools."
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        applications: user.applications || [],
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setHasChanges(true);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const removeApplication = (index: number) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter((_, i) => i !== index),
    });
  };

  const addApplication = (app: any) => {
    setFormData({
      ...formData,
      applications: [...formData.applications, app],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await apiService.updateAccount(formData);
      if (response.success) {
        showSuccessToast("Account updated successfully!");
        dispatch(refreshUser()); // Refresh user data in Redux store
        setHasChanges(false);
        setEditMode(false);
      } else {
        showErrorToast("Failed to update account.");
      }
    } catch (error) {
      showErrorToast("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        username: user.username || "",
        applications: user.applications || [],
      });
    }
    setEditMode(false);
    setHasChanges(false);
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography>Please log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <>
      {metaTags}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Header Section with Enhanced Design */}
        <Paper 
          elevation={0} 
          sx={{ 
            background: 'linear-gradient(135deg, #2f855a 0%, #38a169 100%)',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            mb: 4
          }}
        >
          <Box sx={{ p: 4, color: 'white', position: 'relative', zIndex: 2 }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: "rgba(255,255,255,0.2)",
                      fontSize: "2.5rem",
                      border: '4px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    {formData.username
                      ? formData.username.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </Avatar>
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      color: '#2f855a',
                      '&:hover': {
                        bgcolor: 'white'
                      }
                    }}
                  >
                    <Camera size={16} />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                  {formData.username || "Welcome!"}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Chip
                    label="Premium Account"
                    sx={{ 
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    icon={<Zap size={16} />}
                    label="Active"
                    color="success"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, opacity: 0.9 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Mail size={16} />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Calendar size={16} />
                    <Typography variant="body2">
                      Member since {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={editMode ? <X size={18} /> : <Edit3 size={18} />}
                  onClick={() => editMode ? handleCancelEdit() : setEditMode(true)}
                  sx={{
                    bgcolor: editMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.15)',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: editMode ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.25)',
                    }
                  }}
                >
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          {/* Decorative Elements */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 3, 
                  bgcolor: '#e8f5e8', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Activity size={24} color="#2f855a" />
                </Box>
                <Typography variant="h4" fontWeight="700" color="#2f855a">
                  {formData.applications?.length || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Connected Apps
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 3, 
                  bgcolor: '#e3f2fd', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <BarChart3 size={24} color="#1976d2" />
                </Box>
                <Typography variant="h4" fontWeight="700" color="#1976d2">
                  24/7
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitoring
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 3, 
                  bgcolor: '#fff3e0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Shield size={24} color="#f57c00" />
                </Box>
                <Typography variant="h4" fontWeight="700" color="#f57c00">
                  99%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Uptime
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 3, 
                  bgcolor: '#f3e5f5', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Globe size={24} color="#7b1fa2" />
                </Box>
                <Typography variant="h4" fontWeight="700" color="#7b1fa2">
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Regions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabbed Content */}
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fafafa' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  minHeight: 64,
                  fontSize: '1rem'
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2f855a',
                  height: 3
                }
              }}
            >
              <Tab 
                icon={<User size={20} />} 
                label="Personal Info" 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
              <Tab 
                icon={<Activity size={20} />} 
                label="Connected Apps" 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
              <Tab 
                icon={<Settings size={20} />} 
                label="Preferences" 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
            </Tabs>
          </Box>

          {/* Personal Info Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3 }}>
              {hasChanges && (
                <Slide direction="down" in={hasChanges}>
                  <Alert 
                    severity="info" 
                    sx={{ mb: 3, borderRadius: 2 }}
                    action={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" onClick={handleSubmit} disabled={saving}>
                          {saving ? <CircularProgress size={16} /> : <Check size={16} />}
                          Save
                        </Button>
                        <Button size="small" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </Box>
                    }
                  >
                    You have unsaved changes
                  </Alert>
                </Slide>
              )}
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Basic Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Username
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Enter your username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={!editMode}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              bgcolor: editMode ? "#fff" : "#f8f9fa",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Email Address
                        </Typography>
                        <TextField
                          fullWidth
                          value={user.email}
                          disabled
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              bgcolor: "#f8f9fa",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3, 
                      bgcolor: '#f8f9fa',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Account Status
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Account Type
                      </Typography>
                      <Chip label="Premium" color="success" size="small" sx={{ mt: 1 }} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Last Login
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={75} 
                      sx={{ 
                        mt: 2, 
                        borderRadius: 1,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#2f855a'
                        }
                      }} 
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Profile completion: 75%
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Connected Apps Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="600">
                  Connected Applications
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  onClick={() => setAddOpen(true)}
                  sx={{
                    background: "#2f855a",
                    "&:hover": {
                      background: "#38a169",
                    },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Connect New App
                </Button>
              </Box>

              {formData.applications && formData.applications.length > 0 ? (
                <Grid container spacing={3}>
                  {formData.applications.map((app, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Fade in timeout={300 + index * 100}>
                        <Card
                          elevation={0}
                          sx={{
                            borderRadius: 3,
                            border: "1px solid #e0e0e0",
                            position: "relative",
                            transition: 'all 0.2s ease-in-out',
                            "&:hover": { 
                              borderColor: "#2f855a",
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(47, 133, 90, 0.1)'
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Box sx={{ 
                                width: 50, 
                                height: 50, 
                                borderRadius: 2, 
                                bgcolor: '#e8f5e8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {app.type === "FACEBOOK_INSIGHTS" ? (
                                  <BarChart3 size={24} color="#2f855a" />
                                ) : app.type === "GOOGLE_ANALYTICS" ? (
                                  <Search size={24} color="#2f855a" />
                                ) : (
                                  <Activity size={24} color="#2f855a" />
                                )}
                              </Box>
                              <IconButton
                                size="small"
                                onClick={() => removeApplication(index)}
                                sx={{
                                  color: "#d32f2f",
                                  "&:hover": {
                                    bgcolor: "rgba(211, 47, 47, 0.1)",
                                  },
                                }}
                              >
                                <Trash2 size={16} />
                              </IconButton>
                            </Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                              {app.label}
                            </Typography>
                            <Chip
                              label={app.category}
                              size="small"
                              sx={{
                                bgcolor: "#e3f2fd",
                                color: "#1976d2",
                                mb: 2,
                              }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%', 
                                bgcolor: '#4caf50' 
                              }} />
                              <Typography variant="body2" color="text.secondary">
                                Connected and active
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "2px dashed #ddd",
                    p: 6,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    bgcolor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}>
                    <Plus size={32} color="#999" />
                  </Box>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No applications connected
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Connect your analytics platforms to start gathering insights and optimize your digital presence
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Plus size={18} />}
                    onClick={() => setAddOpen(true)}
                    sx={{
                      borderColor: "#2f855a",
                      color: "#2f855a",
                      "&:hover": {
                        borderColor: "#38a169",
                        bgcolor: "rgba(47, 133, 90, 0.05)",
                      },
                    }}
                  >
                    Connect Your First App
                  </Button>
                </Paper>
              )}
            </Box>
          </TabPanel>

          {/* Preferences Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
                Account Preferences
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Bell size={20} color="#2f855a" />
                      <Typography variant="h6" fontWeight="600">
                        Notifications
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage how you receive updates and alerts
                    </Typography>
                    {/* Add notification preferences here */}
                    <Button variant="outlined" size="small">
                      Configure
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Shield size={20} color="#2f855a" />
                      <Typography variant="h6" fontWeight="600">
                        Security
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage your account security settings
                    </Typography>
                    <Button variant="outlined" size="small">
                      Manage
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Paper>

        {/* Save Changes Button - Only show when editing */}
        {editMode && hasChanges && (
          <Fade in>
            <Paper 
              elevation={4}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                p: 2,
                borderRadius: 3,
                zIndex: 1000,
                background: 'white'
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={saving}
                  startIcon={saving ? <CircularProgress size={16} /> : <Check size={16} />}
                  sx={{
                    background: "#2f855a",
                    "&:hover": {
                      background: "#38a169",
                    },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                  startIcon={<X size={16} />}
                  sx={{
                    borderColor: "#999",
                    color: "#666",
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}

        <AddApplicationDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onAdd={addApplication}
        />
      </Container>
    </>
  );
};

export default Profile;
