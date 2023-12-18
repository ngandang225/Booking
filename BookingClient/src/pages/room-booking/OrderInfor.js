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
const formatDate =(date)=>{
  var newDate= new Date(date);
  const formatedDate= newDate.getDate()+'/'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
  return formatedDate;
}
export default function OrderInfor({bookInfor}) {
  return (
    <Card id="order-infor">
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 500, color: "#000000" ,marginBottom:2}}
          color="text.secondary"
          gutterBottom
        >
          Thông tin đặt phòng
        </Typography>
        <Stack sx={{marginBottom:2}} direction="row" spacing={22}>
          <div>Nhận phòng</div>
          <div>Trả phòng</div>
        </Stack>
        <Stack
          direction="row"
          spacing={10}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <div
            style={{
              display: "flex",
              flexDirection:'column',
              justifyContent: "space-around",
              alignItems: "start",
            }}
          >
            <strong>{formatDate(bookInfor.startDate)}</strong>
            <p>Giờ vào : 10:00</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection:'column',
              alignItems: "start",
            }}
          >
            <strong>{formatDate(bookInfor.endDate)}</strong>
            <p>Giờ ra : 10:00</p>
          </div>
        </Stack>
        <Divider sx={{marginTop:3}}></Divider>
        <div style={{marginTop:16}}>
        <strong >{bookInfor.roomNum} phòng, {bookInfor.peopleNum} người, {bookInfor.dateNum} đêm</strong>
        </div>
      </CardContent>
    </Card>
  );
}
