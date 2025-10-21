import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import { Trash2, Plus } from "lucide-react";

interface Application {
  category: string;
  type: string;
  label: string;
  configuration: any;
}

interface ConnectedApplicationsProps {
  applications: Application[];
  onAddClick: () => void;
  onRemove: (index: number) => void;
}

const ConnectedApplications: React.FC<ConnectedApplicationsProps> = ({
  applications,
  onAddClick,
  onRemove,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="600"
          color="text.primary"
        >
    Connected Applications
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={onAddClick}
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

      {applications && applications.length > 0 ? (
        <Paper
          elevation={1}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid #e0e0e0",
          }}
        >
          <List>
            {applications.map((app, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    "&:hover": { bgcolor: "#f8f9fa" },
                    py: 2,
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="h6" fontWeight="600">
                          {app.label}
                        </Typography>
                        <Chip
                          label={app.category}
                          size="small"
                          sx={{
                            bgcolor: "#e3f2fd",
                            color: "#1976d2",
                          }}
                        />
                        <Chip
                          label={app.type.replace("_", " ")}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        Connected and ready to use • Configuration active
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => onRemove(index)}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          bgcolor: "rgba(211, 47, 47, 0.1)",
                        },
                      }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < applications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "#f8f9fa",
            border: "2px dashed #ddd",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
          >
            No applications connected
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Connect your analytics platforms to start gathering
            insights
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Plus size={18} />}
            onClick={onAddClick}
            sx={{ borderRadius: 2 }}
          >
            Add Your First Application
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ConnectedApplications;