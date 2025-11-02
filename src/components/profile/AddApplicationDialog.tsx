import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Alert,
} from "@mui/material";
import { 
  Plus, 
  X, 
  Facebook, 
  Search, 
  Activity,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

interface Application {
  category: string;
  type: string;
  label: string;
  configuration: any;
}

interface AddApplicationDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (app: Application) => void;
}

const applicationTypes = [
  {
    id: 'FACEBOOK_INSIGHTS',
    name: 'Facebook Insights',
    description: 'Connect your Facebook Ads account to track campaign performance',
    icon: Facebook,
    category: 'SOCIAL_MEDIA',
    color: '#1877f2',
    popular: true,
  },
  {
    id: 'GOOGLE_ANALYTICS',
    name: 'Google Analytics',
    description: 'Monitor website traffic and user behavior analytics',
    icon: Search,
    category: 'ANALYTICS',
    color: '#ea4335',
    popular: true,
  },
  {
    id: 'CUSTOM_API',
    name: 'Custom API',
    description: 'Connect any custom analytics or monitoring service',
    icon: Activity,
    category: 'CUSTOM',
    color: '#2f855a',
    popular: false,
  },
];

const AddApplicationDialog: React.FC<AddApplicationDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [step, setStep] = useState(0);
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [newApp, setNewApp] = useState({
    category: "",
    type: "",
    label: "",
    ga4: "",
    accountId: "",
    token: "",
  });
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setModalErrors({});
    setStep(0);
    setSelectedApp('');
    setNewApp({
      category: "",
      type: "",
      label: "",
      ga4: "",
      accountId: "",
      token: "",
    });
    onClose();
  };

  const handleSelectApp = (appType: string) => {
    const app = applicationTypes.find(a => a.id === appType);
    if (app) {
      setSelectedApp(appType);
      setNewApp(prev => ({
        ...prev,
        type: appType,
        category: app.category,
        label: app.name,
      }));
      setStep(1);
    }
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleAdd = async () => {
    setLoading(true);
    
    // validate modal fields based on type
    const errs: Record<string, string> = {};
    if (newApp.type === "FACEBOOK_INSIGHTS") {
      if (!newApp.accountId || newApp.accountId.trim() === "")
        errs.accountId = "Account ID is required";
      if (!newApp.token || newApp.token.trim() === "")
        errs.token = "Access Token is required";
    }
    
    if (Object.keys(errs).length) {
      setModalErrors(errs);
      setLoading(false);
      return;
    }

    const cfg: Record<string, string> = {};
    if (newApp.type === "FACEBOOK_INSIGHTS") {
      if (newApp.accountId) cfg["accountId"] = newApp.accountId;
      if (newApp.token) cfg["accessToken"] = newApp.token;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // add application
    onAdd({
      category: newApp.category || "ANALYTICS",
      type: newApp.type,
      label: newApp.label || "New Application",
      configuration: cfg,
    });

    setLoading(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { 
          borderRadius: 4,
          overflow: 'hidden'
        },
      }}
    >
      <Box sx={{ 
        background: 'linear-gradient(135deg, #2f855a 0%, #38a169 100%)',
        color: 'white',
        p: 3,
        position: 'relative'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Plus size={24} />
            <Box>
              <Typography variant="h5" fontWeight="700">
                Connect New Application
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Integrate your analytics platforms and monitoring tools
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <X size={24} />
          </IconButton>
        </Box>
        
        {/* Progress Stepper */}
        <Stepper 
          activeStep={step} 
          sx={{ 
            mt: 3,
            '& .MuiStepLabel-label': {
              color: 'rgba(255,255,255,0.8) !important',
              fontWeight: 600
            },
            '& .MuiStepLabel-label.Mui-active': {
              color: 'white !important'
            },
            '& .MuiStepIcon-root': {
              color: 'rgba(255,255,255,0.3)',
              '&.Mui-active': {
                color: 'white'
              },
              '&.Mui-completed': {
                color: 'white'
              }
            }
          }}
        >
          <Step>
            <StepLabel>Choose Application</StepLabel>
          </Step>
          <Step>
            <StepLabel>Configure Settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Connect & Verify</StepLabel>
          </Step>
        </Stepper>
      </Box>

      <DialogContent sx={{ p: 0, minHeight: 400 }}>
        {/* Step 1: Choose Application */}
        {step === 0 && (
          <Fade in timeout={300}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
                Choose an application to connect
              </Typography>
              
              <Grid container spacing={3}>
                {applicationTypes.map((app) => {
                  const IconComponent = app.icon;
                  return (
                    <Grid item xs={12} sm={6} key={app.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 3,
                          border: selectedApp === app.id ? `2px solid ${app.color}` : '1px solid #e0e0e0',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            borderColor: app.color,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${app.color}20`
                          }
                        }}
                        onClick={() => handleSelectApp(app.id)}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 2,
                              bgcolor: `${app.color}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <IconComponent size={24} color={app.color} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="h6" fontWeight="600">
                                  {app.name}
                                </Typography>
                                {app.popular && (
                                  <Chip 
                                    label="Popular" 
                                    size="small"
                                    sx={{ 
                                      bgcolor: '#f0f9ff',
                                      color: '#0369a1',
                                      fontWeight: 600,
                                      fontSize: '0.7rem'
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {app.description}
                              </Typography>
                              <Chip 
                                label={app.category} 
                                size="small"
                                sx={{ 
                                  bgcolor: `${app.color}15`,
                                  color: app.color,
                                  fontWeight: 600
                                }}
                              />
                            </Box>
                            <ArrowRight size={20} color="#999" />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Step 2: Configure Settings */}
        {step === 1 && (
          <Fade in timeout={300}>
            <Box sx={{ p: 4 }}>
              {newApp.type && (
                <>
                  {/* Selected App Header */}
                  <Box sx={{ mb: 4, p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {(() => {
                        const app = applicationTypes.find(a => a.id === newApp.type);
                        const IconComponent = app?.icon;
                        return (
                          <>
                            {IconComponent && (
                              <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: `${app?.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <IconComponent size={20} color={app?.color} />
                              </Box>
                            )}
                            <Box>
                              <Typography variant="h6" fontWeight="600">
                                {newApp.label}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Configure your connection settings
                              </Typography>
                            </Box>
                          </>
                        );
                      })()}
                    </Box>
                  </Box>

                  {/* Configuration Fields */}
                  {newApp.type === "FACEBOOK_INSIGHTS" && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                          <Typography variant="body2">
                            You'll need a Facebook Business account and access token. 
                            <a href="#" style={{ color: '#2f855a', textDecoration: 'none' }}>
                              Learn how to get these credentials →
                            </a>
                          </Typography>
                        </Alert>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          Facebook Account ID
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Include act_ prefix (e.g., act_123456789)"
                          value={newApp.accountId}
                          onChange={(e) =>
                            setNewApp({ ...newApp, accountId: e.target.value })
                          }
                          variant="outlined"
                          required
                          error={!!modalErrors.accountId}
                          helperText={modalErrors.accountId}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          Access Token
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Enter your Facebook access token"
                          value={newApp.token}
                          onChange={(e) =>
                            setNewApp({ ...newApp, token: e.target.value })
                          }
                          variant="outlined"
                          type="password"
                          required
                          error={!!modalErrors.token}
                          helperText={modalErrors.token}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {newApp.type === "GOOGLE_ANALYTICS" && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                          <Typography variant="body2">
                            Connect your Google Analytics 4 property for comprehensive website analytics.
                          </Typography>
                        </Alert>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          GA4 Measurement ID
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="G-XXXXXXXXXX"
                          value={newApp.ga4}
                          onChange={(e) =>
                            setNewApp({ ...newApp, ga4: e.target.value })
                          }
                          variant="outlined"
                          required
                          error={!!modalErrors.ga4}
                          helperText={modalErrors.ga4}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </>
              )}
            </Box>
          </Fade>
        )}

        {/* Step 3: Connect & Verify */}
        {step === 2 && (
          <Fade in timeout={300}>
            <Box sx={{ p: 4, textAlign: 'center' }}>
              {loading ? (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Activity size={48} color="#2f855a" style={{ animation: 'pulse 2s infinite' }} />
                  </Box>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    Connecting to {newApp.label}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    We're verifying your credentials and establishing a secure connection.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      onClick={handleClose}
                      sx={{ borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ mb: 3 }}>
                    <CheckCircle size={48} color="#2f855a" />
                  </Box>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    Ready to Connect
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Click the button below to establish connection with {newApp.label}.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      startIcon={<ArrowLeft size={16} />}
                      sx={{ borderRadius: 2, px: 3 }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleAdd}
                      variant="contained"
                      startIcon={<CheckCircle size={16} />}
                      sx={{
                        background: '#2f855a',
                        '&:hover': {
                          background: '#38a169',
                        },
                        borderRadius: 2,
                        px: 4,
                      }}
                    >
                      Connect Application
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Fade>
        )}
      </DialogContent>

      {/* Footer Actions - Only show for steps 0 and 1 */}
      {step < 2 && (
        <DialogActions sx={{ px: 4, pb: 3, gap: 2, justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={step === 0 ? handleClose : handleBack}
            startIcon={step === 0 ? <X size={16} /> : <ArrowLeft size={16} />}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>
          
          {step === 1 && (
            <Button
              onClick={handleNext}
              variant="contained"
              endIcon={<ArrowRight size={16} />}
              disabled={!newApp.type}
              sx={{
                background: '#2f855a',
                '&:hover': {
                  background: '#38a169',
                },
                borderRadius: 2,
                px: 4,
              }}
            >
              Continue
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AddApplicationDialog;