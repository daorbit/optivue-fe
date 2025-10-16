import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import { Shield, Mail, User, Calendar, Activity } from "lucide-react";

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
    <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Shield size={20} color="#0f7b76" />
          <Typography variant="h6" fontWeight="600">
            Account Overview
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 3 }}>
        {/* Profile Avatar and Name */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#0f7b76",
              mx: "auto",
              mb: 2,
              fontSize: "2rem",
            }}
          >
            {username ? username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            {username || "User"}
          </Typography>
          <Chip
            label="Active"
            color="success"
            size="small"
            sx={{ fontSize: "0.75rem" }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Account Details */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
          >
            <Mail size={18} color="#666" />
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
            <User size={18} color="#666" />
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
            <Calendar size={18} color="#666" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Member Since
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {new Date().toLocaleDateString()} {/* Placeholder */}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Stats */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Activity size={18} color="#0f7b76" />
            <Typography variant="body2" color="text.secondary" fontWeight="600">
              Connected Services
            </Typography>
          </Box>
          <Typography variant="h3" fontWeight="bold" color="#0f7b76" sx={{ mb: 1 }}>
            {applicationsCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Applications linked
          </Typography>
          {applicationsCount > 0 && (
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              ✓ All services active
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccountOverview;