import { Outlet } from "react-router-dom";
import Header from "./header/header.js";
import { Box } from "@mui/material";
import Sidebar from "./sidebar/sidebar.js";
function LayoutPartner() {
  return (
    <Box>
      <Header type="partner" />
      <Box
        id="bottom"
        sx={{
          display: "flex",
          minHeight: (theme) => `calc(100vh - ${theme.spacing(8)})`,
          mt: "60px",
        }}
      >
        <Box
          id="left"
          sx={{
            flexGrow: 0,
          }}
        >
          <Sidebar />
        </Box>
        <Box
          id="right"
          sx={{
            flexGrow: 1
          }}
        >
          <Outlet></Outlet>
        </Box>
      </Box>
    </Box>
  );
}
export default LayoutPartner;