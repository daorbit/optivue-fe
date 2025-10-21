import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { refreshUser } from "../store/slices/authSlice";
import { apiService } from "../services/api";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Alert,
  Grid,
  Avatar,
  Chip,
  Divider,
  Fab,
  Button,
  IconButton,
} from "@mui/material";
import { Activity, Save, Trash2, Plus, BarChart3, Search } from "lucide-react";
import AddApplicationDialog from "./profile/AddApplicationDialog";

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    setLoading(true);
    setMessage("");

    try {
      const response = await apiService.updateAccount(formData);
      if (response.success) {
        setMessage("Account updated successfully!");
        dispatch(refreshUser()); // Refresh user data in Redux store
      } else {
        setMessage("Failed to update account.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography>Please log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2, position: 'relative' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3, color: '#333' }}>
        My Profile
      </Typography>

      {/* User Information */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#2f855a",
                mx: "auto",
                mb: 2,
                fontSize: "2rem",
              }}
            >
              {formData.username ? formData.username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              {formData.username || "User"}
            </Typography>
            <Chip
              label="Active"
              color="success"
              size="small"
              sx={{ fontSize: "0.75rem" }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Username
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "#f8f9fa",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email Address
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ mt: 1 }}>
                {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Member Since
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ mt: 1 }}>
                {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Connected Services
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="#2f855a" sx={{ mt: 1 }}>
                {formData.applications?.length || 0}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Connected Applications */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" fontWeight="600" color="text.primary">
            Connected Applications
          </Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={() => setAddOpen(true)}
            sx={{
              background: '#2f855a',
              '&:hover': {
                background: '#38a169',
              },
              borderRadius: 2,
              px: 3,
            }}
          >
            Add Application
          </Button>
        </Box>

        {formData.applications && formData.applications.length > 0 ? (
          <Grid container spacing={2}>
            {formData.applications.map((app, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={0} sx={{ 
                  borderRadius: 2, 
                  border: '1px solid #e0e0e0',
                  position: 'relative',
                  '&:hover': { borderColor: '#2f855a' }
                }}>
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {app.type === 'FACEBOOK_INSIGHTS' ? (
                        <BarChart3 size={32} color="#2f855a" />
                      ) : app.type === 'GOOGLE_ANALYTICS' ? (
                        <Search size={32} color="#2f855a" />
                      ) : (
                        <Activity size={32} color="#2f855a" />
                      )}
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
                        mb: 1
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Connected and active
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeApplication(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#d32f2f',
                        '&:hover': {
                          bgcolor: 'rgba(211, 47, 47, 0.1)',
                        },
                      }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card elevation={0} sx={{ 
            borderRadius: 2, 
            border: '2px dashed #ddd',
            p: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No applications connected
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Connect your analytics platforms to start gathering insights
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Plus size={18} />}
              onClick={() => setAddOpen(true)}
              sx={{ borderRadius: 2 }}
            >
              Add Your First Application
            </Button>
          </Card>
        )}
      </Box>

      {/* Floating Save Button */}
      <Fab
        color="primary"
        aria-label="save"
        onClick={handleSubmit}
        disabled={loading}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#2f855a',
          '&:hover': {
            background: '#38a169',
          },
        }}
      >
        <Save size={24} />
      </Fab>

      {/* Message Alert */}
      {message && (
        <Alert
          severity={message.includes("successfully") ? "success" : "error"}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            borderRadius: 2,
            minWidth: 300
          }}
        >
          {message}
        </Alert>
      )}

      <AddApplicationDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addApplication}
      />
    </Container>
  );
};

export default Profile;
