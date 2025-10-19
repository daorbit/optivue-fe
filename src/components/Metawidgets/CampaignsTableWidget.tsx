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
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import {  Play, Pause, Archive, Image, Video, Facebook, Instagram } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  lifetime_budget?: string;
  start_time: string;
  stop_time?: string;
  created_time: string;
  updated_time: string;
  platform: 'facebook' | 'instagram' | 'mixed';
  insights?: {
    impressions: string;
    clicks: string;
    spend: string;
    reach: string;
    frequency: string;
    cpc: string;
    cpm: string;
    ctr: string;
    conversions?: string;
    cost_per_conversion?: string;
    actions?: any[];
    action_values?: any[];
    placement_with_impression_share?: string;
    cost_per_action_type?: any[];
    website_ctr?: number;
    website_clicks?: number;
  };
}

interface CampaignCreative {
  ad_id: string;
  ad_name: string;
  ad_status: string;
  creative: {
    id: string;
    name?: string;
    effective_object_story_id?: string;
    object_story_spec?: any;
    thumbnail_url?: string;
    image_url?: string;
    video_id?: string;
    object_type?: string;
    title?: string;
    body?: string;
    link_url?: string;
    call_to_action?: any;
    video_details?: any;
    image_details?: any;
  };
}

interface CampaignsTableWidgetProps {
  campaigns: Campaign[];
  campaignCreatives: {[campaignId: string]: CampaignCreative[]};
  campaignStatusFilter: string;
  formatCurrencyWithConversion: (amount: string, currency: string) => string;
  getCampaignStatusColor: (status: string) => string;
  getCampaignMedia: (campaignId: string) => Array<{type: 'image' | 'video', url: string, thumbnail?: string}>;
}

const CampaignsTableWidget: React.FC<CampaignsTableWidgetProps> = ({
  campaigns,
  campaignCreatives,
  campaignStatusFilter,
  formatCurrencyWithConversion,
  getCampaignStatusColor,
  getCampaignMedia,
}) => {
  // Helper to read insight values safely for different shapes returned by API
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

  const filteredCampaigns = campaignStatusFilter === 'all'
    ? campaigns
    : campaigns.filter(campaign => campaign.status.toLowerCase() === campaignStatusFilter);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={16} color="#1877f2" />;
      case 'instagram':
        return <Instagram size={16} color="#e4405f" />;
      case 'mixed':
        return (
          <Box display="flex" gap={0.5}>
            <Facebook size={12} color="#1877f2" />
            <Instagram size={12} color="#e4405f" />
          </Box>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Play size={16} color="#10b981" />;
      case 'paused':
        return <Pause size={16} color="#f59e0b" />;
      case 'archived':
        return <Archive size={16} color="#6b7280" />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        mt: 4,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
            Campaigns Overview
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mt: 1 }}>
            {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151', py: 2 }}>Campaign</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Platform</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Objective</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Budget</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Impressions</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Clicks</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Spend</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>CTR</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Media</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCampaigns.map((campaign) => {
                const media = getCampaignMedia(campaign.id);
                return (
                  <TableRow
                    key={campaign.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="600" sx={{ color: '#1f2937' }}>
                          {campaign.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          ID: {campaign.id}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {getStatusIcon(campaign.status)}
                        <Chip
                          label={campaign.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getCampaignStatusColor(campaign.status)}15`,
                            color: getCampaignStatusColor(campaign.status),
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {getPlatformIcon(campaign.platform)}
                        <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                          {campaign.platform}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {campaign.objective.replace(/_/g, ' ')}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {campaign.daily_budget
                          ? formatCurrencyWithConversion(String(campaign.daily_budget), "USD")
                          : 'N/A'
                        }
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        daily
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(campaign, 'impressions')
                          ? parseInt(String(readInsight(campaign, 'impressions'))).toLocaleString()
                          : '0'
                        }
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(campaign, 'clicks')
                          ? parseInt(String(readInsight(campaign, 'clicks'))).toLocaleString()
                          : '0'
                        }
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(campaign, 'spend')
                          ? formatCurrencyWithConversion(String(readInsight(campaign, 'spend')), "USD")
                          : formatCurrencyWithConversion('0', "USD")
                        }
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(campaign, 'ctr')
                          ? `${parseFloat(String(readInsight(campaign, 'ctr'))).toFixed(2)}%`
                          : '0%'
                        }
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" gap={1}>
                        {media.slice(0, 3).map((item, index) => (
                          <Tooltip key={index} title={item.type === 'video' ? 'Video Ad' : 'Image Ad'}>
                            {item.thumbnail ? (
                              <Avatar
                                src={item.thumbnail}
                                alt={item.type}
                                sx={{ width: 32, height: 32, cursor: 'pointer' }}
                                onClick={() => item.url && window.open(item.url, '_blank')}
                              />
                            ) : (
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  backgroundColor: item.type === 'video' ? '#ef4444' : '#10b981',
                                  cursor: 'pointer'
                                }}
                                onClick={() => item.url && window.open(item.url, '_blank')}
                              >
                                {item.type === 'video' ? (
                                  <Video size={16} color="white" />
                                ) : (
                                  <Image size={16} color="white" />
                                )}
                              </Avatar>
                            )}
                          </Tooltip>
                        ))}
                        {media.length > 3 && (
                          <Avatar sx={{ width: 32, height: 32, backgroundColor: '#6b7280' }}>
                            <Typography variant="caption" sx={{ color: 'white', fontSize: '0.6rem' }}>
                              +{media.length - 3}
                            </Typography>
                          </Avatar>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredCampaigns.length === 0 && (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#6b7280' }}>
              No campaigns found matching the selected filters.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignsTableWidget;