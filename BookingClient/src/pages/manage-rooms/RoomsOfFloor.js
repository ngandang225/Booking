import * as React from "react";
import { Stack, Button, Typography, Grid } from "@mui/material";
import RoomButton from "./RoomButton";

function RoomsOfFloor({ floor, rooms, setOpenEdit, setSelectedRoom }) {
  return (
    <>
      <h3>Tầng {floor}</h3>
      <Grid container sx={{ maxWidth: "90%" }} rowSpacing={4}>
        {rooms.map((room) => (
          <Grid
          key={room.id}
            onClick={() => {
              setOpenEdit(true);
              setSelectedRoom(room);
            }}
            item
            lg={12 / 5}
          >
            <RoomButton room={room} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default RoomsOfFloor;
