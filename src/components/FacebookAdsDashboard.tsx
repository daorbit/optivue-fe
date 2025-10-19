import { useState, useEffect } from "react";
// import { Box } from '@mui/material'
import {
  PerformanceMetricsWidget,
  FiltersWidget,
  AdsTableWidget,
} from "./Metawidgets";
import AnalyticsDrawer from "./AnalyticsDrawer";
import { apiService } from "../services/api";
import { HelpCircle } from "lucide-react";

const FacebookAdsDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });
  const [campaignStatusFilter, setCampaignStatusFilter] = useState("all");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [campaignStatusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const params = {
        date_preset: "last_30d",
        status:
          campaignStatusFilter !== "all" ? campaignStatusFilter : undefined,
      };

      console.log("Fetching Facebook Ads data with params:", params);
      const response = await apiService.getFacebookAdsOverview(params);
      console.log("API Response:", response);

      if (response.success) {
        setData(response.data);
      }
    } catch (err) {
      console.error("Error fetching Facebook Ads data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: string | number) => {
    return Number(num).toLocaleString();
  };

  const formatCurrencyWithConversion = (
    amount: string | number,
    currency: string
  ) => {
    return `$${Number(amount).toFixed(2)} ${currency}`;
  };

  const processCampaignsWithInsights = () => {
    if (!data?.campaigns || !data?.ads) return data?.campaigns || [];

    return data.campaigns.map((campaign: any) => {
      // Find all ads for this campaign
      const campaignAds = data.ads.filter(
        (ad: any) => ad.campaign_id === campaign.id
      );

      // Aggregate insights from all ads in this campaign
      const aggregatedInsights = campaignAds.reduce((acc: any, ad: any) => {
        if (ad.insights && ad.insights.data && ad.insights.data.length > 0) {
          const insight = ad.insights.data[0];
          return {
            impressions:
              (acc.impressions || 0) + (Number(insight.impressions) || 0),
            clicks: (acc.clicks || 0) + (Number(insight.clicks) || 0),
            spend: (acc.spend || 0) + (Number(insight.spend) || 0),
            reach: (acc.reach || 0) + (Number(insight.reach) || 0),
            frequency: Math.max(
              acc.frequency || 0,
              Number(insight.frequency) || 0
            ), // Take max frequency
            cpc:
              ((acc.cpc || 0) * (acc.clickCount || 0) +
                (Number(insight.cpc) || 0) * (Number(insight.clicks) || 0)) /
                ((acc.clickCount || 0) + (Number(insight.clicks) || 0)) || 0, // Weighted average
            cpm:
              ((acc.cpm || 0) * (acc.impressionCount || 0) +
                (Number(insight.cpm) || 0) *
                  (Number(insight.impressions) || 0)) /
                ((acc.impressionCount || 0) +
                  (Number(insight.impressions) || 0)) || 0, // Weighted average
            ctr:
              ((acc.ctr || 0) * (acc.impressionCount || 0) +
                (Number(insight.ctr) || 0) *
                  (Number(insight.impressions) || 0)) /
                ((acc.impressionCount || 0) +
                  (Number(insight.impressions) || 0)) || 0, // Weighted average
            clickCount: (acc.clickCount || 0) + (Number(insight.clicks) || 0),
            impressionCount:
              (acc.impressionCount || 0) + (Number(insight.impressions) || 0),
          };
        }
        return acc;
      }, {});

      // Convert numbers back to strings for consistency
      const insights = {
        impressions: String(aggregatedInsights.impressions || 0),
        clicks: String(aggregatedInsights.clicks || 0),
        spend: String(aggregatedInsights.spend || 0),
        reach: String(aggregatedInsights.reach || 0),
        frequency: String(aggregatedInsights.frequency || 0),
        cpc: String(aggregatedInsights.cpc || 0),
        cpm: String(aggregatedInsights.cpm || 0),
        ctr: String(aggregatedInsights.ctr || 0),
      };

      return {
        ...campaign,
        insights,
      };
    });
  };

  const processedCampaigns = processCampaignsWithInsights();

  // Calculate totals from campaigns
  const calculateTotals = () => {
    const campaigns = processedCampaigns;
    if (!campaigns) return { impressions: 0, clicks: 0, spend: 0, reach: 0 };

    return campaigns.reduce(
      (acc: any, campaign: any) => {
        // Handle both array and object formats for insights
        let insights = campaign.insights || {};
        if (Array.isArray(insights) && insights.length > 0) {
          insights = insights[0]; // Take the first insights object
        }

        return {
          impressions: acc.impressions + (Number(insights.impressions) || 0),
          clicks: acc.clicks + (Number(insights.clicks) || 0),
          spend: acc.spend + (Number(insights.spend) || 0),
          reach: acc.reach + (Number(insights.reach) || 0),
        };
      },
      { impressions: 0, clicks: 0, spend: 0, reach: 0 }
    );
  };

  // Calculate additional metrics
  const calculateAdditionalMetrics = () => {
    const totals = calculateTotals();
    const ctr =
      totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
    const cpc = totals.clicks > 0 ? totals.spend / totals.clicks : 0;
    const cpm =
      totals.impressions > 0 ? (totals.spend / totals.impressions) * 1000 : 0;

    return { ctr, cpc, cpm };
  };

  if (loading) {
    return (
      <div className="facebook-ads-dashboard">
        <div>Loading...</div>
      </div>
    );
  }
  const totals = calculateTotals();

  const additionalMetrics = calculateAdditionalMetrics();

  return (
    <div className="facebook-ads-dashboard">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <h1
          style={{
            color: "#2b3a36",
            fontSize: "1rem",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Facebook Ads Dashboard
        </h1>
        <HelpCircle
          size={14}
          color="#0f7b76"
          style={{ cursor: "pointer" }}
          onClick={() => setDrawerOpen(true)}
        />
      </div>
      <div
        className="dashboard-grid"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <FiltersWidget
          dateRange={dateRange}
          campaignStatusFilter={campaignStatusFilter}
          onDateRangeChange={(start, end) =>
            setDateRange({
              startDate: start || new Date(),
              endDate: end || new Date(),
            })
          }
          onCampaignStatusChange={setCampaignStatusFilter}
        />
        <PerformanceMetricsWidget
          totals={totals}
          currency="USD"
          formatNumber={formatNumber}
          formatCurrencyWithConversion={formatCurrencyWithConversion}
        />

        {/* {processedCampaigns && (
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <CampaignSummaryWidget
                campaigns={processedCampaigns}
                platform="facebook"
                formatCurrencyWithConversion={formatCurrencyWithConversion}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CampaignSummaryWidget
                campaigns={processedCampaigns}
                platform="instagram"
                formatCurrencyWithConversion={formatCurrencyWithConversion}
              />
            </Box>
          </Box>
        )} */}
        {data?.ads && (
          <AdsTableWidget
            ads={data.ads}
            campaignStatusFilter={campaignStatusFilter}
            formatCurrencyWithConversion={formatCurrencyWithConversion}
          />
        )}
      </div>

      <AnalyticsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        account={data?.account}
        ctr={additionalMetrics.ctr}
        cpc={additionalMetrics.cpc}
        cpm={additionalMetrics.cpm}
        currency="USD"
        formatCurrencyWithConversion={formatCurrencyWithConversion}
      />
    </div>
  );
};

export default FacebookAdsDashboard;
