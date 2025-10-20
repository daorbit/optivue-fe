import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { RotateCcw, ExternalLink } from "lucide-react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/lib/css/marvel-devices.min.css";

interface WebsitePreviewProps {
  url: string;
}

const WebsitePreview = ({ url }: WebsitePreviewProps) => {
  const handleRefresh = () => {
    const iframe = document.querySelector(
      'iframe[title*="Preview"]'
    ) as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleOpenInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <Card sx={{ mb: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            p: 1,
            borderBottom: "1px solid #e0e0e0",
            background: "linear-gradient(135deg, #66bb6a 0%, #81c784 100%)",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Website Preview
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Refresh Preview">
                <IconButton
                  size="small"
                  onClick={handleRefresh}
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <RotateCcw size={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open in New Tab">
                <IconButton
                  size="small"
                  onClick={handleOpenInNewTab}
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ExternalLink size={18} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Preview Area */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "500px",
            backgroundColor: "#fff",
          }}
        >
          {/* @ts-ignore */}
          <DeviceFrameset device={"Samsung Galaxy S5"} color="black">
            <iframe
              src={url}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Website Preview"
            />
          </DeviceFrameset>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WebsitePreview;
