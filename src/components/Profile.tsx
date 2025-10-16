import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { refreshUser } from "../store/slices/authSlice";
import { apiService } from "../services/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import { Settings } from "lucide-react";
import AccountOverview from "./profile/AccountOverview";
import ConnectedApplications from "./profile/ConnectedApplications";
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Account Settings */}
        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "#0f7b76", color: "white", p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Settings size={24} />
                <Typography variant="h5" fontWeight="bold">
                  Account Settings
                </Typography>
              </Box>
            </Box>
            <CardContent sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleSubmit}>
                {/* Username Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    color="text.primary"
                    gutterBottom
                  >
                    Username
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor: "#f8f9fa",
                      },
                    }}
                  />
                </Box>

                <ConnectedApplications
                  applications={formData.applications}
                  onAddClick={() => setAddOpen(true)}
                  onRemove={removeApplication}
                />

                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      flex: 1,
                      bgcolor: "#0f7b76",
                      "&:hover": { bgcolor: "#0c6b67" },
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </Button>
                  
                </Box>

                {message && (
                  <Alert
                    severity={
                      message.includes("successfully") ? "success" : "error"
                    }
                    sx={{ mt: 3, borderRadius: 2 }}
                  >
                    {message}
                  </Alert>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* User Info Sidebar */}
        <Grid item xs={12} md={4}>
          <AccountOverview
            user={user}
            username={formData.username}
            applicationsCount={formData.applications?.length || 0}
          />
        </Grid>
      </Grid>

      <AddApplicationDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addApplication}
      />
    </Container>
  );
};

export default Profile;
