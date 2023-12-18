import * as React from "react";
import "./CheckOut.scss";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  Divider,
  CardHeader,
} from "@mui/material";
import priceFormat from "../../services/priceFormat";
export default function PriceInfor({priceInfor}) {

  return (
    <Card>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            color: "#000000",
            marginBottom:2
          }}
          color="text.secondary"
          gutterBottom
        >
          Giá
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom:14
          }}
        >
          <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#000000",
          }}
          gutterBottom
        >
          Giá gốc
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#000000"
          }}
          gutterBottom
        >
          {priceFormat(priceInfor.total - priceInfor.voucher)} VND
        </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#000000",
          }}
          gutterBottom
        >
          Voucher giảm giá
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#000000",
          }}
          gutterBottom
        >
          -{priceFormat(priceInfor.voucher)} VND
        </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 41,
          }}
        >
          <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "#000000",
          }}
          gutterBottom
        >
          Tổng cộng
        </Typography>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "#000000",
          }}
          gutterBottom
        >
          {priceFormat(priceInfor.total)} VND
        </Typography>
        </div>
        <div
        >
          <Typography
          sx={{
            textAlign:'right',
            fontSize: 16,
            fontWeight: 400,
            color: "#000000",
          }}
          gutterBottom
        >
          Đã bao gồm 8% VAT
        </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
