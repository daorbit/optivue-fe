import React from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { AccountOverviewWidget, AdditionalMetricsWidget } from "./Metawidgets";

interface AnalyticsDrawerProps {
  open: boolean;
  onClose: () => void;
  account?: any;
  ctr?: number;
  cpc?: number;
  cpm?: number;
  currency?: string;
  formatCurrencyWithConversion?: (amount: string, currency: string) => string;
}

const AnalyticsDrawer: React.FC<AnalyticsDrawerProps> = ({
  open,
  onClose,
  account,
  ctr = 0,
  cpc = 0,
  cpm = 0,
  currency = "USD",
  formatCurrencyWithConversion = (amount, currency) => `$${amount} ${currency}`,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 900 },
          borderLeft: "1px solid rgba(15,123,118,0.1)",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            pb: 2,
            borderBottom: "1px solid rgba(15,123,118,0.1)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ color: "#2b3a36", fontSize: "1.1rem" }}
          >
            Analytics Overview
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "#0f7b76",
              "&:hover": {
                backgroundColor: "rgba(15,123,118,0.04)",
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {account && <AccountOverviewWidget account={account} />}

          <AdditionalMetricsWidget
            ctr={ctr}
            cpc={cpc}
            cpm={cpm}
            currency={currency}
            formatCurrencyWithConversion={formatCurrencyWithConversion}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default AnalyticsDrawer;
