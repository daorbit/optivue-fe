import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
} from '@mui/material';
import { Building2, Globe, DollarSign } from 'lucide-react';
 
interface AccountOverviewWidgetProps {
  account: {
    id: string;
    name: string;
    account_id: string;
    currency: string;
    timezone_name: string;
    account_status: number;
    spend_cap?: string;
    balance: string;
  };
}
 
const AccountOverviewWidget: React.FC<AccountOverviewWidgetProps> = ({ account }) => {
  const getAccountStatusColor = (status: number) => {
    switch (status) {
      case 1: return 'success';
      case 2: return 'warning';
      case 3: return 'error';
      case 7: return 'info';
      case 9: return 'error';
      case 101: return 'error';
      default: return 'default';
    }
  };

  const getAccountStatusText = (status: number) => {
    switch (status) {
      case 1: return 'Active';
      case 2: return 'Disabled';
      case 3: return 'Unsettled';
      case 7: return 'Pending Review';
      case 9: return 'In Grace Period';
      case 101: return 'Temporarily Unavailable';
      default: return 'Unknown';
    }
  };

  const formatCurrency = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: '1px solid rgba(15,123,118,0.1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        mb: 1,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
            <Building2 style={{ fontSize: 20, color: '#0f7b76' }} />
            <Typography variant="h6" fontWeight="600" sx={{ color: '#2b3a36', fontSize: '1.1rem' }}>
              Account Overview
            </Typography>
          </Box>
          <Chip
            label={getAccountStatusText(account.account_status)}
            color={getAccountStatusColor(account.account_status)}
            size="small"
            sx={{
              color: '#2b3a36',
              backgroundColor: '#E8FEDF',
              borderColor: 'rgba(15,123,118,0.2)',
              fontSize: '0.75rem',
              fontWeight: 500,
              '& .MuiChip-label': { fontWeight: '500' }
            }}
            variant="outlined"
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Building2 size={16} opacity={0.7} color="#0f7b76" />
              <Typography variant="body2" sx={{ opacity: 0.8, color: '#2b3a36', fontSize: '0.8rem', fontWeight: 500 }}>
                Account Name
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="600" sx={{ color: '#2b3a36', fontSize: '0.95rem' }}>
              {account.name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Building2 size={16} opacity={0.7} color="#0f7b76" />
              <Typography variant="body2" sx={{ opacity: 0.8, color: '#2b3a36', fontSize: '0.8rem', fontWeight: 500 }}>
                Account ID
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="600" sx={{ color: '#2b3a36', fontSize: '0.95rem' }}>
              {account.account_id}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Globe size={16} opacity={0.7} color="#0f7b76" />
              <Typography variant="body2" sx={{ opacity: 0.8, color: '#2b3a36', fontSize: '0.8rem', fontWeight: 500 }}>
                Currency & Timezone
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="600" sx={{ color: '#2b3a36', fontSize: '0.95rem' }}>
              {account.currency} • {account.timezone_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <DollarSign size={16} opacity={0.7} color="#0f7b76" />
              <Typography variant="body2" sx={{ opacity: 0.8, color: '#2b3a36', fontSize: '0.8rem', fontWeight: 500 }}>
                Available Balance
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="600" sx={{ color: '#2b3a36', fontSize: '0.95rem' }}>
              {formatCurrency(account.balance, account.currency)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountOverviewWidget;