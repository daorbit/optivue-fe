import QuickActionsSection from "./Home/QuickActionsSection";

import StatsSection from "./Home/StatsSection";
import WelcomeSection from "./Home/WelcomeSection";

const Home = () => {
  return (
    <div style={{ padding: "24px" }}>
      <WelcomeSection />
      <QuickActionsSection />
      <StatsSection />
    </div>
  );
};

export default Home;
