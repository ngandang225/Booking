import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./CheckOut.scss";

export default function RoomInfor({property}) {
  return (
    <Card className="room-infor">
      <CardContent sx={{paddingBottom:0}}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 500, color: "#000000" }}
          color="text.secondary"
          gutterBottom
        >
          Thông tin chỗ nghỉ
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            Khách sạn: <strong>{property.name}</strong>
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StarIcon fontSize="small" />
            <Typography>{property.score}</Typography>
          </div>
        </div>
        <p>{property.address}</p>
      </CardContent>
      <CardActions sx={{ padding: 0 }}></CardActions>
    </Card>
  );
}
