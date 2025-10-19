import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import { Facebook, Instagram } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  start_time: string;
  stop_time?: string;
  platform: 'facebook' | 'instagram' | 'mixed';
  insights?: {
    impressions?: string;
    clicks?: string;
    spend?: string;
    ctr?: string;
  };
}

interface CampaignSummaryWidgetProps {
  campaigns: Campaign[];
  platform: 'facebook' | 'instagram';
  formatCurrencyWithConversion: (amount: string, currency: string) => string;
}

const CampaignSummaryWidget: React.FC<CampaignSummaryWidgetProps> = ({
  campaigns,
  platform,
  formatCurrencyWithConversion,
}) => {
  // Filter campaigns by platform and status
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.platform === platform && campaign.status === 'ACTIVE'
  );

  const getPlatformIcon = () => {
    return platform === 'facebook' ? (
      <Facebook size={16} color="#1877f2" />
    ) : (
      <Instagram size={16} color="#e4405f" />
    );
  };

  const getPlatformColor = () => {
    return platform === 'facebook' ? '#1877f2' : '#e4405f';
  };

  // Helper to read insight values safely
  const readInsight = (campaign: Campaign, key: string) => {
    if (!campaign?.insights) return undefined;
    let insights: any = campaign.insights;
    // Some responses return { data: [ { ... } ] }
    if (insights.data && Array.isArray(insights.data) && insights.data.length > 0) {
      insights = insights.data[0];
    }
    // Some responses may return an array directly
    if (Array.isArray(insights) && insights.length > 0) {
      insights = insights[0];
    }
    return insights[key];
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        height: 'fit-content',
        border: `2px solid ${getPlatformColor()}20`,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb', backgroundColor: `${getPlatformColor()}10` }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            {getPlatformIcon()}
            <Typography variant="h6" fontWeight="bold" sx={{ color: getPlatformColor() }}>
              {platform === 'facebook' ? 'Facebook' : 'Instagram'} Campaigns
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            {filteredCampaigns.length} active campaign{filteredCampaigns.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        <TableContainer sx={{ maxHeight: 300 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.8rem', py: 1 }}>Campaign</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.8rem' }}>Spend</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.8rem' }}>Impressions</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.8rem' }}>CTR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCampaigns.slice(0, 5).map((campaign) => (
                <TableRow
                  key={campaign.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f9fafb' },
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <TableCell sx={{ py: 1 }}>
                    <Typography variant="body2" fontWeight="600" sx={{ color: '#1f2937', fontSize: '0.8rem' }}>
                      {campaign.name.length > 20 ? `${campaign.name.substring(0, 20)}...` : campaign.name}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 1 }}>
                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
                      {readInsight(campaign, 'spend')
                        ? formatCurrencyWithConversion(String(readInsight(campaign, 'spend')), 'USD')
                        : '$0'
                      }
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 1 }}>
                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
                      {readInsight(campaign, 'impressions')
                        ? parseInt(String(readInsight(campaign, 'impressions'))).toLocaleString()
                        : '0'
                      }
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 1 }}>
                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
                      {readInsight(campaign, 'ctr')
                        ? `${parseFloat(String(readInsight(campaign, 'ctr'))).toFixed(2)}%`
                        : '0%'
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredCampaigns.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              No active {platform} campaigns found.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignSummaryWidget;