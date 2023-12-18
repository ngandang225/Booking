import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./ListItem.scss";
import * as React from "react";
import { useSelector, shallowEqual } from "react-redux";
import routes from "../../../routes";
const format = (value, index) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
function ListItem({ property }) {
  const navigate = useNavigate();
  const search = useSelector((state) => state.filters.filters.search);
  const CheckInDate = new Date(search.CheckInDate);
  const CheckOutDate = new Date(search.CheckOutDate);
  let numberNight = CheckOutDate.getTime() - CheckInDate.getTime();
  numberNight = numberNight / (1000 * 3600 * 24);
  const [isLiked, setIsLiked] = React.useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Card
      className="list-item"
      onClick={() => {
        navigate("/" + routes.detail(property.id));
      }}
      sx={{ position: "relative", borderRadius: 2 }}
    >
      <CardActionArea>
        <FavoriteIcon
          sx={{
            position: "absolute",
            right: "8px",
            top: "8px",
            color: isLiked
              ? (theme) => theme.palette.primary.main
              : (theme) => theme.palette.grey[300],
            borderColor: "black",
            ":hover": { color: (theme) => theme.palette.grey[100] },
          }}
          onClick={handleLike}
        />
        <CardMedia component="img" src={property.images[0]} alt="something" />
        <CardContent sx={{ p: 1.5, pt: 0.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              mt: 0.5,
            }}
          >
            <Typography variant="h6" component="p">
              {property.name}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <StarIcon fontSize="small" />
              <Typography>5</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              Cách trung tâm {property.distance} km
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1">
              {numberNight} đêm - {search.PeopleNum} người
            </Typography>
            <Typography>
              Từ VND {format(property.price * numberNight)}
              {/* <b>{format(property.priceEachNight)}</b> */}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ListItem;
