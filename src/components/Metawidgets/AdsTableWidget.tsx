import React from "react";
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
} from "@mui/material";
import {
  Play,
  Pause,
  Archive,
  Image,
  Video,
  Facebook,
  Instagram,
} from "lucide-react";

interface Ad {
  id: string;
  name: string;
  status: string;
  adset_id: string;
  campaign_id: string;
  date_start?: string;
  date_stop?: string;
  platform: "facebook" | "instagram" | "mixed" | "unknown";
  creative: {
    id: string;
    name?: string;
    thumbnail_url?: string;
    image_url?: string;
    object_type?: string;
  };
  insights?: {
    impressions?: string;
    clicks?: string;
    spend?: string;
    ctr?: string;
    cpc?: string;
    cpm?: string;
    date_start?: string;
    date_stop?: string;
  };
}

interface AdsTableWidgetProps {
  ads: Ad[];
  campaignStatusFilter: string;
  formatCurrencyWithConversion: (amount: string, currency: string) => string;
}

const AdsTableWidget: React.FC<AdsTableWidgetProps> = ({
  ads,
  campaignStatusFilter,
  formatCurrencyWithConversion,
}) => {
  // Filter ads by status
  const filteredAds =
    campaignStatusFilter === "all"
      ? ads
      : ads.filter((ad) => ad.status.toLowerCase() === campaignStatusFilter);

  // Helper to read insight values safely for different shapes returned by API
  const readInsight = (ad: Ad, key: string) => {
    if (!ad?.insights) return undefined;
    let insights: any = ad.insights;
    // Some responses return { data: [ { ... } ] }
    if (
      insights.data &&
      Array.isArray(insights.data) &&
      insights.data.length > 0
    ) {
      insights = insights.data[0];
    }
    // Some responses may return an array directly
    if (Array.isArray(insights) && insights.length > 0) {
      insights = insights[0];
    }
    return insights[key];
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Play size={16} color="#10b981" />;
      case "paused":
        return <Pause size={16} color="#f59e0b" />;
      case "archived":
        return <Archive size={16} color="#6b7280" />;
      default:
        return null;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={16} color="#1877f2" />;
      case "instagram":
        return <Instagram size={16} color="#e4405f" />;
      case "mixed":
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

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid rgba(15,123,118,0.1)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
        mt: 3,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(15,123,118,0.1)" }}>
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ color: "#2b3a36", fontSize: "1.1rem" }}
          >
            Ads Overview
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2b3a36", opacity: 0.7, mt: 0.5, fontSize: "0.8rem" }}
          >
            {filteredAds.length} ad{filteredAds.length !== 1 ? "s" : ""} found
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    py: 1.5,
                    fontSize: "0.8rem",
                  }}
                >
                  Ad
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    fontSize: "0.8rem",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    fontSize: "0.8rem",
                  }}
                >
                  Platform
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    fontSize: "0.8rem",
                  }}
                >
                  Impressions
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    fontSize: "0.8rem",
                  }}
                >
                  Clicks
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    fontSize: "0.8rem",
                  }}
                >
                  Spend
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    fontSize: "0.8rem",
                  }}
                >
                  CTR
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    color: "#2b3a36",
                    fontSize: "0.8rem",
                  }}
                >
                  Media
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAds.map((ad) => {
                const media = {
                  type:
                    ad.creative?.object_type === "VIDEO"
                      ? ("video" as const)
                      : ("image" as const),
                  url:
                    ad.creative?.thumbnail_url || ad.creative?.image_url || "",
                  thumbnail:
                    ad.creative?.thumbnail_url || ad.creative?.image_url,
                };

                return (
                  <TableRow
                    key={ad.id}
                    sx={{
                      "&:hover": { backgroundColor: "#f9fafb" },
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="600"
                          sx={{ color: "#1f2937" }}
                        >
                          {ad.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6b7280" }}>
                          ID: {ad.id}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {getStatusIcon(ad.status)}
                        <Chip
                          label={ad.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              ad.status === "ACTIVE"
                                ? "#10b98115"
                                : "#f59e0b15",
                            color:
                              ad.status === "ACTIVE" ? "#10b981" : "#f59e0b",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {getPlatformIcon(ad.platform)}
                        <Typography
                          variant="caption"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {ad.platform}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(ad, "impressions")
                          ? parseInt(
                              String(readInsight(ad, "impressions"))
                            ).toLocaleString()
                          : "0"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(ad, "clicks")
                          ? parseInt(
                              String(readInsight(ad, "clicks"))
                            ).toLocaleString()
                          : "0"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(ad, "spend")
                          ? formatCurrencyWithConversion(
                              String(readInsight(ad, "spend")),
                              "USD"
                            )
                          : "$0"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {readInsight(ad, "ctr")
                          ? `${parseFloat(
                              String(readInsight(ad, "ctr"))
                            ).toFixed(2)}%`
                          : "0%"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip
                          title={
                            media.type === "video" ? "Video Ad" : "Image Ad"
                          }
                        >
                          {media.thumbnail ? (
                            <Avatar
                              src={media.thumbnail}
                              alt={media.type}
                              sx={{ width: 32, height: 32, cursor: "pointer" }}
                              onClick={() =>
                                media.url && window.open(media.url, "_blank")
                              }
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                backgroundColor:
                                  media.type === "video"
                                    ? "#ef4444"
                                    : "#10b981",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                media.url && window.open(media.url, "_blank")
                              }
                            >
                              {media.type === "video" ? (
                                <Video size={16} color="white" />
                              ) : (
                                <Image size={16} color="white" />
                              )}
                            </Avatar>
                          )}
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredAds.length === 0 && (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "#6b7280" }}>
              No ads found matching the selected filters.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdsTableWidget;
