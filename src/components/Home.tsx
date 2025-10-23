import QuickActionsSection from "./Home/QuickActionsSection";
import StatsSection from "./Home/StatsSection";
import WelcomeSection from "./Home/WelcomeSection";
import { useMetaTags } from "../utils/useMetaTags";

const Home = () => {
  const metaTags = useMetaTags({
    title: "OptiVue - Optimize Your Digital Presence",
    description: "Comprehensive dashboard for SEO analysis, Facebook Ads management, and digital marketing optimization. Get insights and improve your online performance.",
    keywords: "SEO analysis, Facebook ads, digital marketing, optimization, dashboard, analytics",
    ogTitle: "OptiVue - Your Digital Optimization Hub",
    ogDescription: "Transform your digital presence with powerful SEO tools and Facebook Ads management. Get actionable insights to boost your online performance."
  });

  return (
    <>
      {metaTags}
      <div style={{ padding: "24px" }}>
        <WelcomeSection />
        <QuickActionsSection />
        <StatsSection />
      </div>
    </>
  );
};

export default Home;
