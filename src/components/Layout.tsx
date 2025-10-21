import { ReactNode } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Navigation from "./Navigation";
import { MainContent } from "../styles/Layout.styles";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {isAuthenticated && <Navigation />}
      <MainContent isAuthenticated={isAuthenticated}>
        <Box sx={{ width: "100%" }}>{children}</Box>
      </MainContent>
    </Box>
  );
};

export default Layout;
