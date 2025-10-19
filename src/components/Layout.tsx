import { ReactNode } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Sidebar from "./Sidebar";
import { MainContent, SidebarWrapper } from "../styles/Layout.styles";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ display: "flex" }}>
      {isAuthenticated && (
        <SidebarWrapper component="aside">
          <Sidebar />
        </SidebarWrapper>
      )}

      <MainContent component="main">
        <Box sx={{ padding: "24px", width: "100%" }}>{children}</Box>
      </MainContent>
    </Box>
  );
};

export default Layout;
