import * as React from "react";
import "./CheckOut.scss";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  TextField,
  Autocomplete,
  Divider,
  CardHeader,
} from "@mui/material";
import priceFormat from "../../services/priceFormat";
export default function ChosenInfor({ rooms }) {
  return (
    <Card>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            color: "#000000",
            marginBottom: 3,
          }}
          color="text.secondary"
          gutterBottom
        >
          Các phòng đã chọn
        </Typography>
        {rooms?.length >0 && rooms?.map((room) => (
          <Stack sx={{ marginBottom: 2 }} direction="row" spacing={3}>
            <img
              style={{ width: 222, height: 154 }}
              src={room.thumbnail}
            ></img>
            <div>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#000000",
                  marginBottom: 1,
                }}
                color="text.secondary"
                gutterBottom
              >
                {room.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#000000",
                  marginBottom: 1,
                }}
                color="text.secondary"
                gutterBottom
              >
                {room.single_Bed} giường đôi, {room.double_Bed} giường đơn
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#000000",
                  marginBottom: 1,
                }}
                color="text.secondary"
                gutterBottom
              >
                Diện tích: {room.area}m <sup>2</sup>, Tầng {room.floor}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#000000",
                  marginTop: 6,
                }}
                color="text.secondary"
                gutterBottom
              >
                {priceFormat(room.price)} VND/đêm
              </Typography>
            </div>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
