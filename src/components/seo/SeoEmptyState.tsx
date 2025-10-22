import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { ArrowUpWideNarrow } from "lucide-react";

const summaryData = [
  { key: "overall", label: "Overall", value: 85 },
  { key: "performance", label: "Performance", value: 90 },
  { key: "accessibility", label: "Accessibility", value: 88 },
  { key: "bestPractices", label: "Best Practices", value: 92 },
  { key: "seo", label: "SEO", value: 87 },
];

const SeoEmptyState: React.FC<{ onAnalyzeClick?: () => void }> = () => {
  const getGaugeColor = (score: number) => {
    if (score >= 90) return "#66bb6a";
    if (score >= 50) return "#f6c24c";
    return "#ff4d4f";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
        position: "relative",
      }}
    >
      {/* Blurry overlay with text */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ marginTop: "150px", fontWeight: "700" }}
        >
          For SEO Analysis, Enter URL Above
        </Typography>
        <ArrowUpWideNarrow
          style={{
            marginTop: "152px",
            marginLeft: "10px",
            color: "text.secondary",
          }}
        />
      </Box>
      {/* Content behind the blur */}
      <Box
        sx={{
          width: "100%",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {summaryData.map((item) => (
            <Box key={item.key} textAlign="center">
              <Typography variant="subtitle2" color="text.secondary">
                {item.label}
              </Typography>
              <Box
                sx={{
                  width: 180,
                  height: 100,
                  mt: 1,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Gauge
                  value={item.value}
                  valueMin={0}
                  valueMax={100}
                  startAngle={-110}
                  endAngle={110}
                  width={200}
                  height={100}
                  sx={(theme: any) => ({
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: getGaugeColor(item.value),
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: theme.palette.action.disabledBackground,
                    },
                    [`& .${gaugeClasses.valueText}`]: {
                      color: getGaugeColor(item.value),
                    },
                  })}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              SEO Recommendations
            </Typography>
            <List sx={{ textAlign: "left", maxWidth: 400, mx: "auto" }}>
              <ListItem>
                <ListItemText
                  primary="Optimize images for faster loading"
                  secondary="Compress images and use modern formats like WebP"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Improve meta descriptions"
                  secondary="Ensure each page has unique, descriptive meta tags"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Enhance mobile usability"
                  secondary="Make sure your site is responsive and mobile-friendly"
                />
              </ListItem>
            </List>
          </Box>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Performance Data
            </Typography>
            <TableContainer component={Paper} sx={{ width: 600 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Page Load Time</TableCell>
                    <TableCell align="right">2.3s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>First Contentful Paint</TableCell>
                    <TableCell align="right">1.8s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile-Friendly</TableCell>
                    <TableCell align="right">Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HTTPS</TableCell>
                    <TableCell align="right">Enabled</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Backlinks</TableCell>
                    <TableCell align="right">1,250</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Organic Traffic</TableCell>
                    <TableCell align="right">5,400 visits</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SeoEmptyState;
