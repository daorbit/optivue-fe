import React, { useRef, useMemo } from "react";
import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  themeLight,
} from "dockview-react";
import "dockview-react/dist/styles/dockview.css";
import { Box, Typography, Card, CardContent } from "@mui/material";
import PerformanceTab from "./PerformanceTab";
import MetaTagsSection from "./MetaTagsSection";
import TechnicalSeoSection from "./TechnicalSeoSection";
import AdditionalSeoDetails from "./AdditionalSeoDetails";
import MetaTagsTab from "./MetaTagsTab";
import SchemasTab from "./SchemasTab";
import WebsitePreview from "./WebsitePreview";

// Panel components
const PerformancePanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;
  return (
    <div className="seo-panel-content">
      <PerformanceTab analysis={analysis} />
    </div>
  );
};

const MetaTagsPanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;
  return (
    <div className="seo-panel-content">
      <MetaTagsSection analysis={analysis} />
    </div>
  );
};

const TechnicalSeoPanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;
  return (
    <div className="seo-panel-content">
      <TechnicalSeoSection analysis={analysis} />
    </div>
  );
};

const AdditionalSeoPanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;
  return (
    <div className="seo-panel-content">
      <AdditionalSeoDetails analysis={analysis} />
    </div>
  );
};

const MetaTagsDetailPanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;
  return (
    <div className="seo-panel-content">
      <MetaTagsTab analysis={analysis} />
    </div>
  );
};

const SchemasPanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;
  return (
    <div className="seo-panel-content">
      <SchemasTab analysis={analysis} />
    </div>
  );
};

const WebsitePreviewPanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;
  return (
    <div className="seo-panel-content">
      <WebsitePreview url={analysis?.url} />
    </div>
  );
};

const OverviewPanel = (props: IDockviewPanelProps) => {
  const analysis = props.params?.analysis;

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        p: 2,
        bgcolor: "white",
        borderRadius: 0,
      }}
      className="seo-panel-content"
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        SEO Analysis Overview
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          mb: 3,
        }}
      >
        <Card sx={{ backgroundColor: "white", borderRadius: 1, boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#374151" }}>
              {analysis?.content?.h1Count || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              H1 Tags
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "white", borderRadius: 1, boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#ef4444" }}>
              {analysis?.content?.wordCount || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Words
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "white", borderRadius: 1, boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#3b82f6" }}>
              {analysis?.content?.images?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Images
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "white", borderRadius: 1, boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#10b981" }}>
              {analysis?.content?.internalLinks || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Internal Links
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Typography variant="body1" color="text.secondary">
        Use the panels around this overview to dive deep into specific SEO
        aspects. You can dock, undock, and rearrange panels as needed for your
        workflow.
      </Typography>
    </Box>
  );
};

interface SeoAnalysisDockviewProps {
  analysis: any;
}

const SeoAnalysisDockview: React.FC<SeoAnalysisDockviewProps> = ({
  analysis,
}) => {
  const dockviewRef = useRef<any>(null);

  const components = useMemo(() => {
    return {
      overview: OverviewPanel,
      performance: PerformancePanel,
      metaTags: MetaTagsPanel,
      technicalSeo: TechnicalSeoPanel,
      additionalSeo: AdditionalSeoPanel,
      metaTagsDetail: MetaTagsDetailPanel,
      schemas: SchemasPanel,
      websitePreview: WebsitePreviewPanel,
    };
  }, []);

  const onReady = (event: DockviewReadyEvent) => {
    const api = event.api;

    // Create initial layout with simplified positioning
    api.addPanel({
      id: "overview",
      component: "overview",
      title: "Overview",
      params: { analysis },
    });

    api.addPanel({
      id: "performance",
      component: "performance",
      title: "Performance",
      params: { analysis },
      position: { direction: "right" },
    });

    api.addPanel({
      id: "metaTags",
      component: "metaTags",
      title: "Meta Tags & Content",
      params: { analysis },
      position: { direction: "below" },
    });

    api.addPanel({
      id: "technicalSeo",
      component: "technicalSeo",
      title: "Technical SEO",
      params: { analysis },
      position: { direction: "right" },
    });

    api.addPanel({
      id: "websitePreview",
      component: "websitePreview",
      title: "Website Preview",
      params: { analysis },
      position: { direction: "right" },
    });

    // Add additional panels as tabs
    api.addPanel({
      id: "additionalSeo",
      component: "additionalSeo",
      title: "Additional SEO",
      params: { analysis },
    });

    api.addPanel({
      id: "metaTagsDetail",
      component: "metaTagsDetail",
      title: "Meta Tags Detail",
      params: { analysis },
    });

    api.addPanel({
      id: "schemas",
      component: "schemas",
      title: "Schemas",
      params: { analysis },
    });
  };

  return (
    <Box
      sx={{ height: "80vh", width: "100%" }}
      className="dockview-container"
    >
      <DockviewReact
        ref={dockviewRef}
        onReady={onReady}
        components={components}
        theme={themeLight}
        watermarkComponent={() => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "text.secondary",
            }}
          >
            <Typography variant="body2">SEO Analysis Workspace</Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default SeoAnalysisDockview;
