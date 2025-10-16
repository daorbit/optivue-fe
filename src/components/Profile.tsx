import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Alert,
  IconButton
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

const Profile: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    applications: [] as Array<{
      category: string;
      type: string;
      label: string;
      configuration: any;
    }>
  });
  const [newApp, setNewApp] = useState({
    category: '',
    type: '',
    label: '',
    // modal-managed fields
    ga4: '',
    accountId: '',
    token: ''
  });
  const [addOpen, setAddOpen] = useState(false);
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await apiService.getAccount();
        if (response.success) {
          setFormData({
            username: response.user.username || '',
            applications: response.user.applications || []
          });
        }
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };

    fetchAccount();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // application creation is handled via the Add Application dialog

  const removeApplication = (index: number) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await apiService.updateAccount(formData);
      if (response.success) {
        setMessage('Account updated successfully!');
        await refreshUser(); // Refresh user data in context
      } else {
        setMessage('Failed to update account.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          {formData.applications && formData.applications.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Connected Applications
              </Typography>
              <List>
                {formData.applications.map((app, index) => (
                  <ListItem key={index} secondaryAction={
                    <IconButton edge="end" onClick={() => removeApplication(index)}>
                      <Trash2 size={20} />
                    </IconButton>
                  }>
                    <ListItemText
                      primary={`${app.label} (${app.category} - ${app.type})`}
                      secondary={`Configuration: ${JSON.stringify(app.configuration)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" gutterBottom>
              Applications
            </Typography>
            {formData.applications.map((app, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                <Typography variant="body1"><strong>{app.label}</strong> ({app.category} - {app.type})</Typography>
                <Typography variant="body2">Configuration: {JSON.stringify(app.configuration)}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeApplication(index)}
                  sx={{ mt: 1 }}
                >
                  Remove
                </Button>
              </Box>
            ))}

            <Box sx={{ mt: 4 }}> 
              <Button variant="outlined" onClick={() => setAddOpen(true)}>
                Add New Application
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? 'Updating...' : 'Update Account'}
            </Button>

            {message && (
              <Alert severity={message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>

        {/* Add Application Dialog (modal) */}
        <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Add New Application</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <TextField
                select
                label="Type"
                fullWidth
                value={newApp.type}
                onChange={(e) => {
                  const val = e.target.value;
                  // preset category/label based on type
                  if (val === 'FACEBOOK_INSIGHTS') {
                    setNewApp({ ...newApp, type: val, category: 'ANALYTICS', label: 'Facebook Insights', ga4: '', accountId: '', token: '' });
                  } else if (val === 'GOOGLE_ANALYTICS') {
                    setNewApp({ ...newApp, type: val, category: 'ANALYTICS', label: 'Google Analytics', ga4: '', accountId: '', token: '' });
                  } else {
                    setNewApp({ ...newApp, type: val });
                  }
                }}
              >
                <MenuItem value="FACEBOOK_INSIGHTS">Facebook Insights</MenuItem>
                <MenuItem value="GOOGLE_ANALYTICS">Google Analytics</MenuItem>
              </TextField>

              {/* Facebook fields */}
              {newApp.type === 'FACEBOOK_INSIGHTS' && (
                <>
                  <TextField
                    fullWidth
                    label="Account ID"
                    value={newApp.accountId}
                    onChange={(e) => setNewApp({ ...newApp, accountId: e.target.value })}
                    sx={{ mt: 2 }}
                    placeholder="Include act_"
                    required
                    error={!!modalErrors.accountId}
                    helperText={modalErrors.accountId}
                  />
                  <TextField
                    fullWidth
                    label="Access Token"
                    value={newApp.token}
                    onChange={(e) => setNewApp({ ...newApp, token: e.target.value })}
                    sx={{ mt: 2 }}
                    required
                    error={!!modalErrors.token}
                    helperText={modalErrors.token}
                  />
                </>
              )}

              {/* Google fields */}
              {newApp.type === 'GOOGLE_ANALYTICS' && (
                <>
                  <TextField
                    fullWidth
                    label="GA4 Measurement ID"
                    value={newApp.ga4}
                    onChange={(e) => setNewApp({ ...newApp, ga4: e.target.value })}
                    sx={{ mt: 2 }}
                    placeholder="G-XXXXXXXX"
                    required
                    error={!!modalErrors.ga4}
                    helperText={modalErrors.ga4}
                  />
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" onClick={() => { setModalErrors({}); setAddOpen(false); }}>
              Close
            </Button>
            <Button
              onClick={() => {
                // validate modal fields based on type
                const errs: Record<string,string> = {};
                if (newApp.type === 'FACEBOOK_INSIGHTS') {
                  if (!newApp.accountId || newApp.accountId.trim() === '') errs.accountId = 'Account ID is required';
                  if (!newApp.token || newApp.token.trim() === '') errs.token = 'Access Token is required';
                }
                if (newApp.type === 'GOOGLE_ANALYTICS') {
                  if (!newApp.ga4 || newApp.ga4.trim() === '') errs.ga4 = 'GA4 Measurement ID is required';
                }
                if (Object.keys(errs).length) {
                  setModalErrors(errs);
                  return;
                }

                const cfg: Record<string,string> = {};
                if (newApp.type === 'FACEBOOK_INSIGHTS') {
                  if (newApp.accountId) cfg['accountId'] = newApp.accountId;
                  if (newApp.token) cfg['accessToken'] = newApp.token;
                }
                if (newApp.type === 'GOOGLE_ANALYTICS') {
                  if (newApp.ga4) cfg['ga4'] = newApp.ga4;
                }

                // add application
                setFormData({
                  ...formData,
                  applications: [...formData.applications, {
                    category: newApp.category || 'ANALYTICS',
                    type: newApp.type,
                    label: newApp.label || (newApp.type === 'FACEBOOK_INSIGHTS' ? 'Facebook Insights' : 'Google Analytics'),
                    configuration: cfg
                  }]
                });

                // reset and close
                setNewApp({ category: '', type: '', label: '', ga4: '', accountId: '', token: '' });
                setModalErrors({});
                setAddOpen(false);
              }}
              variant="contained"
              sx={{ backgroundColor: '#0f7b76', '&:hover': { backgroundColor: '#0c6b67' } }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Profile;