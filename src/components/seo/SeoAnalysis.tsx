import { useState, useEffect } from "react";
import {
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { analyzeSeo, clearAnalysis } from "../../store/slices/seoSlice";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import SeoHeroSection from "./SeoHeroSection";
import SeoLoadingState from "./SeoLoadingState";
import SeoErrorAlert from "./SeoErrorAlert";
import SeoAnalysisResults from "./SeoAnalysisResults";
import SeoEmptyState from "./SeoEmptyState";
import { useMetaTags } from "../../utils/useMetaTags";

const SeoAnalysis = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { analysis, loading, error } = useSelector(
    (state: RootState) => state.seo
  );
  const location = useLocation();

  useEffect(() => {
    if (location.state?.url) {
      setUrl(location.state.url);
      dispatch(analyzeSeo(location.state.url) as any);
    }
  }, [location.state, dispatch]);

  const handleAnalyze = () => {
    if (url.trim()) {
      dispatch(analyzeSeo(url.trim()) as any);
    }
  };

  const handleClear = () => {
    setUrl("");
    dispatch(clearAnalysis());
  };

  const metaTags = useMetaTags({
    title: "SEO Analysis Tool - OptiVue Website Optimization",
    description: "Analyze your website's SEO performance with comprehensive tools. Get detailed insights on meta tags, performance scores, technical SEO, and actionable recommendations.",
    keywords: "SEO analysis, website optimization, meta tags, performance scores, technical SEO, search engine optimization",
    ogTitle: "SEO Analysis - OptiVue",
    ogDescription: "Comprehensive SEO analysis tool to optimize your website's search engine performance and visibility."
  });

  return (
    <>
      {metaTags}
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <SeoHeroSection
        url={url}
        setUrl={setUrl}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
        loading={loading}
        error={error}
      />
      <Box sx={{padding:"24px"}}>
        {loading && <SeoLoadingState />}
        <SeoErrorAlert error={error} />
        {!analysis && !loading && <SeoEmptyState onAnalyzeClick={handleAnalyze} />}
        {analysis && !loading && <SeoAnalysisResults analysis={analysis} onClear={handleClear} />}
      </Box>
    </Box>
    </>
  );
};

export default SeoAnalysis;
