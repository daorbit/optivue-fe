import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Plus } from "lucide-react";

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

const AddApplicationDialog: React.FC<AddApplicationDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [newApp, setNewApp] = useState({
    category: "",
    type: "",
    label: "",
    ga4: "",
    accountId: "",
    token: "",
  });
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setModalErrors({});
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

  const handleAdd = () => {
    // validate modal fields based on type
    const errs: Record<string, string> = {};
    if (newApp.type === "FACEBOOK_INSIGHTS") {
      if (!newApp.accountId || newApp.accountId.trim() === "")
        errs.accountId = "Account ID is required";
      if (!newApp.token || newApp.token.trim() === "")
        errs.token = "Access Token is required";
    }
    if (newApp.type === "GOOGLE_ANALYTICS") {
      if (!newApp.ga4 || newApp.ga4.trim() === "")
        errs.ga4 = "GA4 Measurement ID is required";
    }
    if (Object.keys(errs).length) {
      setModalErrors(errs);
      return;
    }

    const cfg: Record<string, string> = {};
    if (newApp.type === "FACEBOOK_INSIGHTS") {
      if (newApp.accountId) cfg["accountId"] = newApp.accountId;
      if (newApp.token) cfg["accessToken"] = newApp.token;
    }
    if (newApp.type === "GOOGLE_ANALYTICS") {
      if (newApp.ga4) cfg["ga4"] = newApp.ga4;
    }

    // add application
    onAdd({
      category: newApp.category || "ANALYTICS",
      type: newApp.type,
      label:
        newApp.label ||
        (newApp.type === "FACEBOOK_INSIGHTS"
          ? "Facebook Insights"
          : "Google Analytics"),
      configuration: cfg,
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#0f7b76",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Plus size={24} />
        Add New Application
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ mt: 1 }}>
          {/* Application Type */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              color="text.primary"
              gutterBottom
            >
              Application Type
            </Typography>
            <TextField
              select
              fullWidth
              placeholder="Select application type"
              value={newApp.type}
              onChange={(e) => {
                const val = e.target.value;
                // preset category/label based on type
                if (val === "FACEBOOK_INSIGHTS") {
                  setNewApp({
                    ...newApp,
                    type: val,
                    category: "ANALYTICS",
                    label: "Facebook Insights",
                    ga4: "",
                    accountId: "",
                    token: "",
                  });
                } else if (val === "GOOGLE_ANALYTICS") {
                  setNewApp({
                    ...newApp,
                    type: val,
                    category: "ANALYTICS",
                    label: "Google Analytics",
                    ga4: "",
                    accountId: "",
                    token: "",
                  });
                } else {
                  setNewApp({ ...newApp, type: val });
                }
              }}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f8f9fa",
                },
              }}
            >
              <MenuItem value="FACEBOOK_INSIGHTS">Facebook Insights</MenuItem>
              <MenuItem value="GOOGLE_ANALYTICS">Google Analytics</MenuItem>
            </TextField>
          </Box>

          {/* Facebook fields */}
          {newApp.type === "FACEBOOK_INSIGHTS" && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  color="text.primary"
                  gutterBottom
                >
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
                      bgcolor: "#f8f9fa",
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  color="text.primary"
                  gutterBottom
                >
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
                      bgcolor: "#f8f9fa",
                    },
                  }}
                />
              </Box>
            </>
          )}

          {/* Google fields */}
          {newApp.type === "GOOGLE_ANALYTICS" && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="600"
                color="text.primary"
                gutterBottom
              >
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
                    bgcolor: "#f8f9fa",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 4, pb: 3, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          sx={{
            bgcolor: "#0f7b76",
            "&:hover": { bgcolor: "#0c6b67" },
            borderRadius: 2,
            px: 4,
          }}
        >
          Add Application
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddApplicationDialog;