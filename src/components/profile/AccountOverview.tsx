import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  Grid,
} from "@mui/material";
import { Mail, User, Calendar, Activity } from "lucide-react";

interface AccountOverviewProps {
  user: any;
  username: string;
  applicationsCount: number;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({
  user,
  username,
  applicationsCount,
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
        Account Summary
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden", height: '100%' }}>
            <Box sx={{
              background: '#2f855a',
              color: 'white',
              p: 3,
              textAlign: 'center'
            }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "rgba(255,255,255,0.2)",
                  mx: "auto",
                  mb: 2,
                  fontSize: "2rem",
                }}
              >
                {username ? username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" fontWeight="600">
                {username || "User"}
              </Typography>
              <Chip
                label="Active Member"
                color="success"
                size="small"
                sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Mail size={18} color="#2f855a" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <User size={18} color="#2f855a" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Username
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {username || "Not set"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Calendar size={18} color="#2f855a" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Member Since
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden", height: '100%' }}>
            <Box sx={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              p: 3,
              textAlign: 'center'
            }}>
              <Activity size={48} />
              <Typography variant="h6" fontWeight="600" sx={{ mt: 1 }}>
                Connected Services
              </Typography>
            </Box>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h1" fontWeight="bold" sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}>
                {applicationsCount}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Applications linked
              </Typography>
              {applicationsCount > 0 && (
                <Chip
                  label="✓ All services active"
                  color="success"
                  sx={{ fontSize: "0.875rem" }}
                />
              )}
              {applicationsCount === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No applications connected yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountOverview;