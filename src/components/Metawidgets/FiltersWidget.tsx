import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Filter } from 'lucide-react';

interface FiltersWidgetProps {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  campaignStatusFilter: string;
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  onCampaignStatusChange: (status: string) => void;
}

const FiltersWidget: React.FC<FiltersWidgetProps> = ({
  dateRange,
  campaignStatusFilter,
  onDateRangeChange,
  onCampaignStatusChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Filter size={20} color="white" />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dashboard Filters
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="body2" fontWeight="600" mb={1} sx={{ color: '#374151' }}>
                  Start Date
                </Typography>
                <DatePicker
                  value={dateRange.startDate}
                  onChange={(newValue) => onDateRangeChange(newValue, dateRange.endDate)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="body2" fontWeight="600" mb={1} sx={{ color: '#374151' }}>
                  End Date
                </Typography>
                <DatePicker
                  value={dateRange.endDate}
                  onChange={(newValue) => onDateRangeChange(dateRange.startDate, newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2" fontWeight="600" mb={1} sx={{ color: '#374151' }}>
                Campaign Status
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={campaignStatusFilter}
                  onChange={(e) => onCampaignStatusChange(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#6366f1',
                    },
                  }}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="paused">Paused</MenuItem>
                  <MenuItem value="deleted">Deleted</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </LocalizationProvider>
  );
};

export default FiltersWidget;