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
        borderRadius: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
            <Building2 style={{ fontSize: 28 }} />
            <Typography variant="h5" fontWeight="bold">
              Account Overview
            </Typography>
          </Box>
          <Chip
            label={getAccountStatusText(account.account_status)}
            color={getAccountStatusColor(account.account_status)}
            size="small"
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '& .MuiChip-label': { fontWeight: 'bold' }
            }}
            variant="outlined"
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Building2 size={20} opacity={0.8} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Account Name
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600">
              {account.name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Building2 size={20} opacity={0.8} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Account ID
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600">
              {account.account_id}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Globe size={20} opacity={0.8} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Currency & Timezone
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600">
              {account.currency} • {account.timezone_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <DollarSign size={20} opacity={0.8} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Available Balance
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600">
              {formatCurrency(account.balance, account.currency)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountOverviewWidget;