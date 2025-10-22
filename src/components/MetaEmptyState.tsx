import { useNavigate } from "react-router-dom";
import { PerformanceMetricsWidget, AdsTableWidget } from "./Metawidgets";
import { Button } from "@mui/material"; 

const MetaEmptyState = () => {
  const navigate = useNavigate();

   const hardcodedTotals = {
    impressions: 10000,
    clicks: 500,
    spend: 250.5,
    reach: 8000,
  };

   const hardcodedAds = [
    {
      id: "1",
      name: "Sample Ad 1",
      status: "ACTIVE",
      adset_id: "adset1",
      campaign_id: "camp1",
      platform: "facebook" as const,
      creative: {
        id: "creative1",
        name: "Sample Creative 1",
        thumbnail_url: "https://via.placeholder.com/150",
      },
      insights: {
        impressions: "2000",
        clicks: "100",
        spend: "50.00",
        ctr: "5.00",
        cpc: "0.50",
        cpm: "25.00",
      },
    },
    {
      id: "2",
      name: "Sample Ad 2",
      status: "ACTIVE",
      adset_id: "adset2",
      campaign_id: "camp1",
      platform: "facebook" as const,
      creative: {
        id: "creative2",
        name: "Sample Creative 2",
        thumbnail_url: "https://via.placeholder.com/150",
      },
      insights: {
        impressions: "3000",
        clicks: "150",
        spend: "75.00",
        ctr: "5.00",
        cpc: "0.50",
        cpm: "25.00",
      },
    },
    {
      id: "3",
      name: "Sample Ad 3",
      status: "PAUSED",
      adset_id: "adset3",
      campaign_id: "camp2",
      platform: "facebook" as const,
      creative: {
        id: "creative3",
        name: "Sample Creative 3",
        thumbnail_url: "https://via.placeholder.com/150",
      },
      insights: {
        impressions: "5000",
        clicks: "250",
        spend: "125.50",
        ctr: "5.00",
        cpc: "0.50",
        cpm: "25.00",
      },
    },
  ];

  const formatNumber = (num: string | number) => {
    return Number(num).toLocaleString();
  };

  const formatCurrencyWithConversion = (
    amount: string | number,
    currency: string
  ) => {
    return `$${Number(amount).toFixed(2)} ${currency}`;
  };

  return (
    <div
      className="meta-empty-state"
      style={{ position: "relative", padding: "24px" }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/profile")}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        Configure App
      </Button>

      <div style={{ filter: "blur(3px)", pointerEvents: "none" }}>
        <div
          className="dashboard-grid"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <PerformanceMetricsWidget
            totals={hardcodedTotals}
            currency="USD"
            formatNumber={formatNumber}
            formatCurrencyWithConversion={formatCurrencyWithConversion}
            loading={false}
          />
          <AdsTableWidget
            ads={hardcodedAds}
            campaignStatusFilter="all"
            formatCurrencyWithConversion={formatCurrencyWithConversion}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default MetaEmptyState;
