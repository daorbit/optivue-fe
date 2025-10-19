import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { analyzeSeo, clearAnalysis } from "../../store/slices/seoSlice";
import { RootState } from "../../store";
import UrlInputSection from "./UrlInputSection.tsx";
// import PerformanceScores from "./PerformanceScores.tsx";
import KeyMetrics from "./KeyMetrics.tsx";
import MetaTagsSection from "./MetaTagsSection.tsx";
import TechnicalSeoSection from "./TechnicalSeoSection.tsx";
import AdditionalSeoDetails from "./AdditionalSeoDetails.tsx";

const SeoAnalysis = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { analysis, loading, error } = useSelector(
    (state: RootState) => state.seo
  );

  const handleAnalyze = () => {
    if (url.trim()) {
      dispatch(analyzeSeo(url.trim()) as any);
    }
  };

  const handleClear = () => {
    setUrl("");
    dispatch(clearAnalysis());
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        SEO Analysis Tool
      </Typography>

      <UrlInputSection
        url={url}
        setUrl={setUrl}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
        loading={loading}
        error={error}
      />

      {analysis && !loading && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}></Typography>

          {/* <PerformanceScores analysis={analysis} /> */}
          <KeyMetrics analysis={analysis} />
          <MetaTagsSection analysis={analysis} />
          <TechnicalSeoSection analysis={analysis} />
          <AdditionalSeoDetails analysis={analysis} />
        </Box>
      )}
    </Box>
  );
};

export default SeoAnalysis;
