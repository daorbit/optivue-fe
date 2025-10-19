import { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Sidebar from "./Sidebar";
import { MainContent, SidebarWrapper } from "../styles/Layout.styles";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {isAuthenticated && (
        <SidebarWrapper>
          <Sidebar onToggle={handleSidebarToggle} />
        </SidebarWrapper>
      )}

      <MainContent collapsed={isSidebarCollapsed} isAuthenticated={isAuthenticated}>
        <Box sx={{ padding: "24px", width: "100%" }}>{children}</Box>
      </MainContent>
    </Box>
  );
};

export default Layout;
