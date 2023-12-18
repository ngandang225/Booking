import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./RoomDetail.scss";
import priceFormat from "../../../services/priceFormat";
function RoomDetail({ handleSelect, handleClose, room }) {
  // React.useEffect(() => {
  //   if (room.images.length < 10)
  //     for (let i = 0; i < 4; i++) room.images.push(room.images[0]);
  // }, []);

  const views = room.facilities.filter((f) => f.type === "View");
  const amenities = room.facilities.filter((f) => f.type === "Amenity");

  function renderFirstHalf() {
    const list = [];
    for (let i = 0; i < Math.floor(amenities.length / 2) + 1; i++) {
      list.push(<li key={amenities[i].id}>{amenities[i].name}</li>);
    }
    return <ul>{list}</ul>;
  }
  function renderSecondHalf() {
    const list = [];
    for (
      let i = Math.floor(amenities.length / 2) + 1;
      i < amenities.length;
      i++
    ) {
      list.push(<li key={amenities[i].id}>{amenities[i].name}</li>);
    }
    return <ul>{list}</ul>;
  }
  function renderSmallImages() {
    const list = [];
    for (let i = 1; i < room.images.length; i++) {
      list.push(
        <Grid item xs={1} md={2}>
          <img className="small-img" src={room.images[i]} alt="something" />
        </Grid>
      );
    }
    return (
      <Grid container columns={10} spacing={1}>
        {list}
      </Grid>
    );
  }
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: { xs: "100%", md: "80%", lg: "60%" },
          maxHeight: 600,
        },
      }}
      maxWidth="md"
      open={true}
      onClose={handleClose}
      id="room-detail"
    >
      <DialogContent sx={{ paddingBottom: "4px" }}>
        <Grid container columns={5} spacing={{ md: 2, xs: 3 }} mb={1}>
          <Grid xs={5} md={3} item order={{ md: 1, xs: 2 }}>
            <img id="big-img" src={room.images[0]} alt="something" />
            {renderSmallImages()}
          </Grid>
          <Grid xs={5} md={2} item order={{ md: 2, xs: 1 }}>
            <Typography>Phòng {room.room_Number}</Typography>
            <Typography variant="h3">{room.name}</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="h5">Kích thước phòng</Typography>
              <Typography>
                {room.area}m<sup>2</sup>
              </Typography>
            </Box>

            <Typography>
              {room.single_Bed} giường đơn, {room.double_Bed} giường đôi lớn,
              giường thoải mái
            </Typography>
            <Typography>
              Dành cho {room.single_Bed * 1 + room.double_Bed * 2} người
            </Typography>
            <Typography>{room.description}</Typography>
            {views.length > 0 && (
              <Box>
                <Typography variant="h5">View</Typography>
                <ul>
                  {views.map((view) => (
                    <li key={view.id}>{view.name}</li>
                  ))}
                </ul>
              </Box>
            )}
            <Box>
              <Typography variant="h5">Tiện nghi phòng</Typography>
              <Grid container>
                <Grid item xs={6}>
                  {renderFirstHalf()}
                </Grid>
                <Grid item xs={6}>
                  {renderSecondHalf()}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h4" component="p">
          VND {priceFormat(room.price)}/đêm
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={handleSelect}
        >
          Đặt ngay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoomDetail;
