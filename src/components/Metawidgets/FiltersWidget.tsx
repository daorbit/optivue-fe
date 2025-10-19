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
          borderRadius: 2,
          border: '1px solid rgba(15,123,118,0.1)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: '#0f7b76',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Filter size={16} color="white" />
            </Box>
            <Typography variant="h6" fontWeight="600" sx={{ color: '#2b3a36', fontSize: '1.1rem' }}>
              Dashboard Filters
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="body2" fontWeight="500" mb={1} sx={{ color: '#2b3a36', fontSize: '0.875rem' }}>
                  Start Date
                </Typography>
                <DatePicker
                  value={dateRange.startDate}
                  onChange={(newValue) => onDateRangeChange(newValue, dateRange.endDate)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(15,123,118,0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#0f7b76',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0f7b76',
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="body2" fontWeight="500" mb={1} sx={{ color: '#2b3a36', fontSize: '0.875rem' }}>
                  End Date
                </Typography>
                <DatePicker
                  value={dateRange.endDate}
                  onChange={(newValue) => onDateRangeChange(dateRange.startDate, newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(15,123,118,0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#0f7b76',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0f7b76',
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="body2" fontWeight="500" mb={1} sx={{ color: '#2b3a36', fontSize: '0.875rem' }}>
                  Campaign Status
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={campaignStatusFilter}
                    onChange={(e) => onCampaignStatusChange(e.target.value)}
                    sx={{
                      borderRadius: 1,
                      backgroundColor: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(15,123,118,0.2)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0f7b76',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0f7b76',
                      },
                      '& .MuiSelect-select': {
                        color: '#2b3a36',
                        fontSize: '0.875rem',
                      },
                    }}
                  >
                    <MenuItem value="all" sx={{ fontSize: '0.875rem' }}>All Statuses</MenuItem>
                    <MenuItem value="active" sx={{ fontSize: '0.875rem' }}>Active</MenuItem>
                    <MenuItem value="paused" sx={{ fontSize: '0.875rem' }}>Paused</MenuItem>
                    <MenuItem value="deleted" sx={{ fontSize: '0.875rem' }}>Deleted</MenuItem>
                    <MenuItem value="archived" sx={{ fontSize: '0.875rem' }}>Archived</MenuItem>
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