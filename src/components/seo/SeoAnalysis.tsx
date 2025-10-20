import { useState } from "react";
import {
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { analyzeSeo, clearAnalysis } from "../../store/slices/seoSlice";
import { RootState } from "../../store";
import SeoHeroSection from "./SeoHeroSection";
import SeoLoadingState from "./SeoLoadingState";
import SeoErrorAlert from "./SeoErrorAlert";
import SeoAnalysisResults from "./SeoAnalysisResults";

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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <SeoHeroSection
        url={url}
        setUrl={setUrl}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
        loading={loading}
        error={error}
      />
      <Box>
        {loading && <SeoLoadingState />}
        <SeoErrorAlert error={error} />
        {analysis && !loading && <SeoAnalysisResults analysis={analysis} onClear={handleClear} />}
      </Box>
    </Box>
  );
};

export default SeoAnalysis;
