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
  Skeleton,
} from "@mui/material";
import {  Image, Video } from "lucide-react";

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
  loading?: boolean;
}

const AdsTableWidget: React.FC<AdsTableWidgetProps> = ({
  ads,
  campaignStatusFilter,
  formatCurrencyWithConversion,
  loading = false,
}) => {
  if (loading) {
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
            <Skeleton variant="text" width={120} height={24} />
            <Skeleton variant="text" width={80} height={16} sx={{ mt: 0.5 }} />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[...Array(6)].map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="text" width={80} height={16} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {[...Array(6)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton
                          variant="text"
                          width={cellIndex === 0 ? 120 : 60}
                          height={16}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        mt: 3,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(15,123,118,0.1)" }}>
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{
              color: "#1a202c",
              fontSize: "1rem",
              
            }}
          >
            Ads Overview
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
                  }}
                >
                  Ad
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
                  }}
                >
                  Impressions
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
                  }}
                >
                  Clicks
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
                  }}
                >
                  Spend
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
                  }}
                >
                  CTR
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "500",
                    color: "#1a202c",
                    py: 2,
                    fontSize: "0.875rem",
                    backgroundColor: "#f7fafc",
                    
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
                      "&:hover": { backgroundColor: "#f8fafc" },
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          sx={{
                            color: "#1a202c",
                            fontSize: "0.875rem",
                            
                          }}
                        >
                          {ad.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4a5568",
                          fontSize: "0.875rem",
                          
                        }}
                      >
                        {ad.id}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={ad.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              ad.status === "ACTIVE" ? "#c6f6d5" : "#fed7d7",
                            color:
                              ad.status === "ACTIVE" ? "#22543d" : "#742a2a",
                            fontWeight: "600",
                            fontSize: "0.75rem",
                            textTransform: "capitalize",
                            
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography
                        variant="body1"
                        fontWeight="600"
                        sx={{
                          color: "#1a202c",
                          fontSize: "0.875rem",
                          
                        }}
                      >
                        {readInsight(ad, "impressions")
                          ? parseInt(
                              String(readInsight(ad, "impressions"))
                            ).toLocaleString()
                          : "0"}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography
                        variant="body1"
                        fontWeight="600"
                        sx={{
                          color: "#1a202c",
                          fontSize: "0.875rem",
                          
                        }}
                      >
                        {readInsight(ad, "clicks")
                          ? parseInt(
                              String(readInsight(ad, "clicks"))
                            ).toLocaleString()
                          : "0"}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography
                        variant="body1"
                        fontWeight="600"
                        sx={{
                          color: "#1a202c",
                          fontSize: "0.875rem",
                          
                        }}
                      >
                        {readInsight(ad, "spend")
                          ? formatCurrencyWithConversion(
                              String(readInsight(ad, "spend")),
                              "USD"
                            )
                          : "$0"}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography
                        variant="body1"
                        fontWeight="600"
                        sx={{
                          color: "#1a202c",
                          fontSize: "0.875rem",
                          
                        }}
                      >
                        {readInsight(ad, "ctr")
                          ? `${parseFloat(
                              String(readInsight(ad, "ctr"))
                            ).toFixed(2)}%`
                          : "0%"}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
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
                              sx={{
                                width: 36,
                                height: 36,
                                cursor: "pointer",
                                border: "1px solid #e2e8f0",
                              }}
                              onClick={() =>
                                media.url && window.open(media.url, "_blank")
                              }
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                backgroundColor:
                                  media.type === "video"
                                    ? "#e53e3e"
                                    : "#38a169",
                                cursor: "pointer",
                                border: "1px solid #e2e8f0",
                              }}
                              onClick={() =>
                                media.url && window.open(media.url, "_blank")
                              }
                            >
                              {media.type === "video" ? (
                                <Video size={18} color="white" />
                              ) : (
                                <Image size={18} color="white" />
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
          <Box sx={{ p: 8, textAlign: "center", backgroundColor: "#f8fafc" }}>
            <Typography
              variant="body1"
              sx={{
                color: "#4a5568",
                fontSize: "0.875rem",
                
              }}
            >
              No ads found matching the selected filters.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdsTableWidget;
