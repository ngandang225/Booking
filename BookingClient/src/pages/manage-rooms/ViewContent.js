import * as React from "react";

import { Typography } from "@mui/material";
import RoomsOfFloor from "./RoomsOfFloor";
function ViewContent({ rooms, floors, setOpenEdit, setSelectedRoom }) {
  return (
    <>
      <h3>Danh sách phòng ở</h3>
      {floors.map((floor, index) => (
        <RoomsOfFloor
          key={index}
          floor={floor}
          rooms={rooms.filter((c) => c.floor === floor)}
          setOpenEdit={setOpenEdit}
          setSelectedRoom={setSelectedRoom}
        ></RoomsOfFloor>
      ))}
    </>
  );
}
export default ViewContent;
