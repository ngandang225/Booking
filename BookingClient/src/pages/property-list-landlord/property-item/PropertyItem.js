import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import priceFormat from "../../../services/priceFormat";
import "./PropertyItem.scss";

function PropertyItem({ property }) {
  const navigate = useNavigate();

  const calculateScore = (property) => {
    const sum = property.rooms.reduce(
      (total, room) => total + room.reviewScore,
      0
    );
    if (property.rooms.length !== 0) {
      return Math.round((sum / property.rooms.length) * 10) / 10;
    }
    return 0;
  };
  const countNumberOfOrders = (property) => {
    return property.rooms.reduce(
      (total, room) => total + room.orderItems.length,
      0
    );
  };
  const calculateRevenue = (property) => {
    return property.rooms.reduce((total, room) => {
      return (
        total +
        room.orderItems.reduce((roomTotal, item) => {
          return roomTotal + item.price;
        }, 0)
      );
    }, 0);
  };
  return (
    <Card
      id="landlord-property-item-wrapper"
      onClick={() => {
        // Direct to property information page
      }}
    >
      <CardActionArea sx={{ padding: "4px 12px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign="center">
            {property.name}
          </Typography>
          <Box className="property-group-information">
            <Stack className="property-information" direction="row">
              <Typography variant="body1">Loại hình:</Typography>
              <Typography variant="body1">
                {property.propertyType
                  ? property.propertyType.name
                  : "Chưa cập nhật"}
              </Typography>
            </Stack>
            <Stack className="property-information" direction="row">
              <Typography variant="body1">Địa chỉ:</Typography>
              <Typography variant="body1" className="property-address">
                {property.address ? property.address : "Chưa cập nhật"}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box className="property-group-information">
            <Stack className="property-information" direction="row">
              <Typography variant="body1">Điểm:</Typography>
              <Typography variant="body1">
                {calculateScore(property)}
              </Typography>
            </Stack>
            <Stack className="property-information" direction="row">
              <Typography variant="body1">Số phòng:</Typography>
              <Typography variant="body1">{property.rooms.length}</Typography>
            </Stack>
            <Stack className="property-information" direction="row">
              <Typography variant="body1">Số đơn đặt phòng:</Typography>
              <Typography variant="body1">
                {countNumberOfOrders(property)}
              </Typography>
            </Stack>
            <Stack className="property-information" direction="row">
              <Typography variant="body1">Số nhân viên:</Typography>
              <Typography variant="body1">{property.staff.length}</Typography>
            </Stack>
          </Box>
          <Divider />
          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            marginTop="20px"
          >
            <Typography variant="body1">Tổng doanh thu:</Typography>
            <Typography variant="body1" className="bold">
              {`VND ${priceFormat(calculateRevenue(property))}`}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PropertyItem;
