import React from "react";
import "./Footer.scss";
import { Box, Link, Typography } from "@mui/material";
export const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
          <Box gridColumn="span 3" className="service" paddingRight="20px">
            <Typography variant="h6">Liên hệ với chúng tôi</Typography>
            <ul>
              <li>
                <div>
                  Trụ sở: Tòa nhà ABC, đường số 3, phường 7, quận 2, TP HCM
                </div>
              </li>

              <li>
                <div>SĐT: 0382-993-293</div>
              </li>
              <li>
                <div>Email: traveleasevn@gmail.com</div>
              </li>
              <li>
                <div>
                  Chi nhánh 1: Số 12, khu phố 4, phường 5, Thành phố Dĩ An, Bình
                  Dương
                </div>
              </li>
            </ul>
          </Box>
          <Box gridColumn="span 1" className="contact">
            <Typography variant="h6">Dịch vụ</Typography>
            <ul>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Nhà ở
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Resort cao cấp
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Homestay
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Căn hộ
                </Link>
              </li>
            </ul>
          </Box>
          <Box gridColumn="span 1" className="partner">
            <Typography variant="h6">Dành cho đối tác</Typography>
            <ul>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Trở thành đối tác nhà ở
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Hỗ trợ online
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Quy định
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Truyền thông
                </Link>
              </li>
            </ul>
          </Box>
          <Box gridColumn="span 1" className="policy">
            <Typography variant="h6">Chính sách</Typography>
            <ul>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Các quy định
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Chính sách người bán
                </Link>
              </li>
              <li>
                <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                  Bảo mật
                </Link>
              </li>
            </ul>
          </Box>
        </Box>
      </footer>
    </div>
  );
};
