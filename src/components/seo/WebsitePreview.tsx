import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Smartphone,
  Tablet,
  RotateCcw,
  Maximize2,
  ExternalLink
} from 'lucide-react';

interface WebsitePreviewProps {
  url: string;
}

type DeviceType = 'tablet' | 'mobile';

interface Device {
  type: DeviceType;
  name: string;
  icon: React.ReactNode;
  width: number;
  height: number;
  scale?: number;
}

const devices: Device[] = [
  {
    type: 'tablet',
    name: 'Tablet',
    icon: <Tablet size={20} />,
    width: 768,
    height: 1024,
    scale: 0.6,
  },
  {
    type: 'mobile',
    name: 'Mobile',
    icon: <Smartphone size={20} />,
    width: 375,
    height: 667,
    scale: 0.75,
  },
];

const WebsitePreview = ({ url }: WebsitePreviewProps) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('mobile');

  const currentDevice = devices.find(d => d.type === selectedDevice) || devices[0];

  const handleRefresh = () => {
    const iframe = document.querySelector('iframe[title*="Preview"]') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleOpenInNewTab = () => {
    window.open(url, '_blank');
  };

  return (
    <Card sx={{ mb: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{
          p: 3,
          borderBottom: '1px solid #e0e0e0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Website Preview
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Refresh Preview">
                <IconButton
                  size="small"
                  onClick={handleRefresh}
                  sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                >
                  <RotateCcw size={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open in New Tab">
                <IconButton
                  size="small"
                  onClick={handleOpenInNewTab}
                  sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                >
                  <ExternalLink size={18} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Device Selector */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {devices.map((device) => (
              <Button
                key={device.type}
                variant={selectedDevice === device.type ? 'contained' : 'outlined'}
                size="small"
                startIcon={device.icon}
                onClick={() => setSelectedDevice(device.type)}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 2,
                  py: 0.5,
                  fontSize: '0.875rem',
                  minWidth: 'auto',
                  backgroundColor: selectedDevice === device.type ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: selectedDevice === device.type ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                }}
              >
                {device.name}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Preview Area */}
        <Box sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '500px',
          backgroundColor: '#f8f9fa',
        }}>
          <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
            {selectedDevice === 'mobile' && (
              <Box
                sx={{
                  position: 'relative',
                  transform: `scale(${currentDevice.scale})`,
                  transformOrigin: 'top center',
                }}
              >
                {/* Phone Frame */}
                <Box
                  sx={{
                    width: currentDevice.width + 24,
                    height: currentDevice.height + 24,
                    backgroundColor: '#1a1a1a',
                    borderRadius: '24px',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    border: '2px solid #333',
                  }}
                >
                  {/* Notch */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '120px',
                      height: '24px',
                      backgroundColor: '#1a1a1a',
                      borderRadius: '0 0 12px 12px',
                      zIndex: 2,
                    }}
                  />
                  {/* Screen */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      width: currentDevice.width,
                      height: currentDevice.height,
                      backgroundColor: '#000',
                      borderRadius: '16px',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      src={url}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      title="Mobile Website Preview"
                    />
                  </Box>
                </Box>
              </Box>
            )}

            {selectedDevice === 'tablet' && (
              <Box
                sx={{
                  position: 'relative',
                  transform: `scale(${currentDevice.scale})`,
                  transformOrigin: 'top center',
                }}
              >
                {/* Tablet Frame */}
                <Box
                  sx={{
                    width: currentDevice.width + 20,
                    height: currentDevice.height + 20,
                    backgroundColor: '#2c2c2c',
                    borderRadius: '16px',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    border: '2px solid #444',
                  }}
                >
                  {/* Home Button */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '4px',
                      backgroundColor: '#666',
                      borderRadius: '2px',
                    }}
                  />
                  {/* Screen */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: currentDevice.width,
                      height: currentDevice.height,
                      backgroundColor: '#000',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      src={url}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      title="Tablet Website Preview"
                    />
                  </Box>
                </Box>
              </Box>
            )}

          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{
          p: 2,
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            Previewing: <strong>{url}</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            Device: {currentDevice.name} ({currentDevice.width} × {currentDevice.height})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WebsitePreview;