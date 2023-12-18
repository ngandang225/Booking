import * as React from "react";
import { Typography, Button, Box } from "@mui/material";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";
const notfoundImage = require("../../assets/notfound.png");

function ErrorPage() {
    const navigate = useNavigate();
  return (
    <Box
      id="error-page-wrapper"
      sx={{
        margin: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "600px"
      }}
    >
      <img src={notfoundImage} alt="Not found" width="300px" />
      <Typography variant="h4">
        Trang bạn tìm không tồn tại hoặc không có quyền truy cập
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          boxShadow: "none",
          marginLeft: 0,
          marginTop: "40px"
        }}
        onClick={() => { navigate(routes.home) }}
      >
        Về trang chủ
      </Button>
    </Box>
  );
}

export default ErrorPage;
