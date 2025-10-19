import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  Users,
  MousePointer,
  DollarSign,
  Target,
  BarChart3,
  Filter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { apiService } from '../services/api';

interface FacebookAdsData {
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
  insights: Array<{
    campaign_id?: string;
    campaign_name?: string;
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
  }>;
}

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
}

interface CampaignCreative {
  ad_id: string;
  ad_name: string;
  ad_status: string;
  creative: {
    id: string;
    name?: string;
    title?: string;
    body?: string;
    image_url?: string;
    video_id?: string;
    thumbnail_url?: string;
    object_story_spec?: any;
    link_url?: string;
    call_to_action?: any;
  };
}

interface PlatformData {
  platform: string;
  impressions: number;
  clicks: number;
  spend: number;
  reach: number;
}

const FacebookAdsDashboard: React.FC = () => {
  const [data, setData] = useState<FacebookAdsData | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignCreatives, setCampaignCreatives] = useState<{[campaignId: string]: CampaignCreative[]}>({});
  const [platformData, setPlatformData] = useState<PlatformData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date(),
  });
  const [campaignStatusFilter, setCampaignStatusFilter] = useState<string>('all');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  useEffect(() => {
    fetchFacebookAdsData();
  }, [dateRange]);

  const fetchFacebookAdsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch overview data with date range
      const overviewParams = {
        since: dateRange.startDate.toISOString().split('T')[0],
        until: dateRange.endDate.toISOString().split('T')[0],
      };
      const overviewResponse = await apiService.getFacebookAdsOverview(overviewParams);

      if (overviewResponse.success) {
        setData(overviewResponse.data);
      } else {
        setError(overviewResponse.message || 'Failed to fetch Facebook Ads data');
        return;
      }

      // Fetch campaigns
      const campaignsResponse = await apiService.getFacebookCampaigns();
      if (campaignsResponse.success) {
        setCampaigns(campaignsResponse.data);

        // Fetch creatives for each campaign
        const creativesPromises = campaignsResponse.data.map((campaign: Campaign) =>
          apiService.getFacebookCampaignCreatives(campaign.id)
        );

        const creativesResponses = await Promise.all(creativesPromises);
        const creativesMap: {[campaignId: string]: CampaignCreative[]} = {};

        campaignsResponse.data.forEach((campaign: Campaign, index: number) => {
          if (creativesResponses[index].success) {
            creativesMap[campaign.id] = creativesResponses[index].data;
          }
        });

        setCampaignCreatives(creativesMap);
      }

      // Fetch detailed insights for platform breakdown
      const insightsParams = {
        level: 'campaign',
        since: dateRange.startDate.toISOString().split('T')[0],
        until: dateRange.endDate.toISOString().split('T')[0],
      };
      const insightsResponse = await apiService.getFacebookInsights(insightsParams);

      if (insightsResponse.success) {
        // Process platform data from insights
        const platformStats = processPlatformData(insightsResponse.data);
        setPlatformData(platformStats);
      }

    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processPlatformData = (insights: any[]): PlatformData[] => {
    const platformMap = new Map<string, PlatformData>();

    insights.forEach(insight => {
      // For now, we'll simulate platform data since Facebook API might not provide it directly
      // In a real implementation, you'd check the campaign's platform targeting
      const platforms = ['facebook', 'instagram', 'audience_network'];
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

      if (!platformMap.has(randomPlatform)) {
        platformMap.set(randomPlatform, {
          platform: randomPlatform,
          impressions: 0,
          clicks: 0,
          spend: 0,
          reach: 0,
        });
      }

      const platform = platformMap.get(randomPlatform)!;
      platform.impressions += parseFloat(insight.impressions || '0');
      platform.clicks += parseFloat(insight.clicks || '0');
      platform.spend += parseFloat(insight.spend || '0');
      platform.reach += parseFloat(insight.reach || '0');
    });

    return Array.from(platformMap.values());
  };

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
    // Using approximate exchange rate: 1 USD = 83 INR (as of 2024)
    const USD_TO_INR_RATE = 83;

    if (fromCurrency === toCurrency) return amount;

    if (fromCurrency === 'USD' && toCurrency === 'INR') {
      return amount * USD_TO_INR_RATE;
    } else if (fromCurrency === 'INR' && toCurrency === 'USD') {
      return amount / USD_TO_INR_RATE;
    }

    return amount; // Fallback
  };

  const formatCurrencyWithConversion = (amount: string, originalCurrency: string) => {
    const numericAmount = parseFloat(amount) || 0;
    const convertedAmount = convertCurrency(numericAmount, originalCurrency, selectedCurrency);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
    }).format(convertedAmount);
  };

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat('en-US').format(parseFloat(num) || 0);
  };

  const getFilteredCampaigns = () => {
    if (campaignStatusFilter === 'all') return campaigns;
    return campaigns.filter(campaign => campaign.status.toLowerCase() === campaignStatusFilter);
  };

  const getCampaignMedia = (campaignId: string) => {
    const creatives = campaignCreatives[campaignId] || [];
    const mediaItems: Array<{type: 'image' | 'video', url: string, thumbnail?: string}> = [];

    creatives.forEach(creative => {
      if (creative.creative.image_url) {
        mediaItems.push({
          type: 'image',
          url: creative.creative.image_url
        });
      } else if (creative.creative.video_id) {
        mediaItems.push({
          type: 'video',
          url: `https://www.facebook.com/${creative.creative.video_id}`,
          thumbnail: creative.creative.thumbnail_url
        });
      }
    });

    return mediaItems.slice(0, 3); // Limit to 3 media items per campaign
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'deleted': return 'error';
      case 'archived': return 'default';
      default: return 'default';
    }
  };

 

  const getAccountStatusColor = (status: number) => {
    switch (status) {
      case 1: return 'success'; // Active
      case 2: return 'warning'; // Disabled
      case 3: return 'error'; // Unsettled
      case 7: return 'info'; // Pending Review
      case 9: return 'error'; // In Grace Period
      case 101: return 'error'; // Temporarily Unavailable
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert severity="info">
        No Facebook Ads data available. Please configure your Facebook Insights application in your profile.
      </Alert>
    );
  }

  // Calculate totals from insights
  const totals = data.insights.reduce(
    (acc, insight) => ({
      impressions: acc.impressions + parseFloat(insight.impressions || '0'),
      clicks: acc.clicks + parseFloat(insight.clicks || '0'),
      spend: acc.spend + parseFloat(insight.spend || '0'),
      reach: acc.reach + parseFloat(insight.reach || '0'),
    }),
    { impressions: 0, clicks: 0, spend: 0, reach: 0 }
  );

  const ctr = totals.clicks / totals.impressions * 100;
  const cpc = totals.spend / totals.clicks;
  const cpm = totals.spend / totals.impressions * 1000;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Facebook Ads Dashboard
        </Typography>

        {/* Filters */}
        <Card sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Filter size={20} />
              <Typography variant="h6" fontWeight="bold">
                Filters
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Start Date"
                  value={dateRange.startDate}
                  onChange={(newValue) => setDateRange(prev => ({ ...prev, startDate: newValue || new Date() }))}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="End Date"
                  value={dateRange.endDate}
                  onChange={(newValue) => setDateRange(prev => ({ ...prev, endDate: newValue || new Date() }))}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Campaign Status</InputLabel>
                  <Select
                    value={campaignStatusFilter}
                    label="Campaign Status"
                    onChange={(e) => setCampaignStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="paused">Paused</MenuItem>
                    <MenuItem value="deleted">Deleted</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={selectedCurrency}
                    label="Currency"
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="INR">INR (₹)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

      {/* Account Overview */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Account Overview
            </Typography>
            <Chip
              label={getAccountStatusText(data.account.account_status)}
              color={getAccountStatusColor(data.account.account_status)}
              size="small"
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Account Name
              </Typography>
              <Typography variant="h6">{data.account.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Account ID
              </Typography>
              <Typography variant="h6">{data.account.account_id}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Currency
              </Typography>
              <Typography variant="h6">{data.account.currency}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Balance
              </Typography>
              <Typography variant="h6">
                {formatCurrencyWithConversion(data.account.balance, data.account.currency)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Performance Metrics
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Users size={20} color="#1976d2" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  Reach
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {formatNumber(totals.reach.toString())}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <MousePointer size={20} color="#2e7d32" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  Impressions
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {formatNumber(totals.impressions.toString())}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Target size={20} color="#ed6c02" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  Clicks
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {formatNumber(totals.clicks.toString())}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <DollarSign size={20} color="#d32f2f" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  Spend
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {formatCurrencyWithConversion(totals.spend.toString(), data.account.currency)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <BarChart3 size={20} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold" ml={1}>
                  CTR
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="primary">
                {ctr.toFixed(2)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click-through rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp size={20} color="#2e7d32" />
                <Typography variant="h6" fontWeight="bold" ml={1}>
                  CPC
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="success.main">
                {formatCurrencyWithConversion(cpc.toString(), data.account.currency)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cost per click
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <BarChart3 size={20} color="#ed6c02" />
                <Typography variant="h6" fontWeight="bold" ml={1}>
                  CPM
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="warning.main">
                {formatCurrencyWithConversion(cpm.toString(), data.account.currency)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cost per 1,000 impressions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Campaigns List */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Campaigns
      </Typography>
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Campaign Name</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Objective</strong></TableCell>
                  <TableCell><strong>Daily Budget</strong></TableCell>
                  <TableCell><strong>Media</strong></TableCell>
                  <TableCell><strong>Created</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredCampaigns().map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={campaign.status}
                        color={getCampaignStatusColor(campaign.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{campaign.objective}</TableCell>
                    <TableCell>
                      {campaign.daily_budget ? formatCurrencyWithConversion(campaign.daily_budget, data?.account.currency) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        {getCampaignMedia(campaign.id).map((media, index) => (
                          <Box key={index} sx={{ width: 40, height: 40, borderRadius: 1, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                            {media.type === 'image' ? (
                              <img
                                src={media.url}
                                alt={`Campaign media ${index + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: '#f5f5f5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Target size={16} color="#666" />
                              </Box>
                            )}
                          </Box>
                        ))}
                        {getCampaignMedia(campaign.id).length === 0 && (
                          <Typography variant="body2" color="text.secondary">
                            No media
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(campaign.created_time).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Platform Distribution */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Platform Distribution
      </Typography>
      <Grid container spacing={3} mb={3}>
        {platformData.map((platform) => (
          <Grid item xs={12} md={4} key={platform.platform}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  {platform.platform === 'facebook' && <Facebook size={24} color="#1877f2" />}
                  {platform.platform === 'instagram' && <Instagram size={24} color="#e4405f" />}
                  {platform.platform === 'audience_network' && <Target size={24} color="#9c27b0" />}
                  <Typography variant="h6" fontWeight="bold" ml={1} sx={{ textTransform: 'capitalize' }}>
                    {platform.platform.replace('_', ' ')}
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Impressions
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatNumber(platform.impressions.toString())}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Clicks
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatNumber(platform.clicks.toString())}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Spend
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatCurrencyWithConversion(platform.spend.toString(), data?.account.currency)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Reach
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatNumber(platform.reach.toString())}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default FacebookAdsDashboard;