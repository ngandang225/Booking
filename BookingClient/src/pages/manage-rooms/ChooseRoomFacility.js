import * as React from "react";
import {
  Stack,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { roomFacilityServices } from "../../services/room-facility-services/roomFacilityService";
function ChooseRoomFacility({
  setIsEdit,
  isEdit,
  setSelectedRoom,
  selectedRoom,
}) {
  const roomFacilities = roomFacilityServices.useAllRoomFacilities();
  const [chosenFacilities, setChosenFacilities] = React.useState([]);
  const handleAdd = (facility) => {
    chosenFacilities.push(facility);
    setSelectedRoom({ ...selectedRoom, facilities: chosenFacilities });
  };
  const handleRemove = (facility) => {
    const index = chosenFacilities.indexOf(facility);
    if (index !== -1) {
      chosenFacilities.splice(index, 1);
      setSelectedRoom({ ...selectedRoom, facilities: chosenFacilities });
    }
  };
  return (
    <Box sx={{ border: 1, borderRadius: "12px", width: "30%" }}>
      <Stack spacing={2} sx={{ marginLeft: "11%" }}>
        <h3 style={{ marginBottom: 0 }}>{`Tiện nghi phòng(*)`}</h3>

        {isEdit == true &&
          roomFacilities?.isSuccess &&
          roomFacilities.data.map((c) => {
            if (c.type == "Amenity") {
              return (
                <FormControlLabel
                  key={c.id}
                  control={
                    <Checkbox
                      checked={
                        selectedRoom.facilities.indexOf(c) !== -1 ? true : false
                      }
                      onChange={(e) => {
                        if (e.target.checked == true) {
                          handleAdd(c);
                        } else {
                          handleRemove(c);
                        }
                      }}
                    />
                  }
                  label={c.name}
                />
              );
            }
          })}
        {isEdit == false &&
          selectedRoom?.facilities?.length > 0 &&
          selectedRoom.facilities.map((c) => {
            if (c.type == "Amenity") {
              return <Typography key={c.id}>{c.name}</Typography>;
            }
          })}

        <h3 style={{ marginBottom: 0 }}>{`Tầm nhìn(*)`}</h3>

        {isEdit == true &&
          roomFacilities?.isSuccess &&
          roomFacilities.data.map((c) => {
            if (c.type != "Amenity") {
              return (
                <FormControlLabel
                  key={c.id}
                  control={
                    <Checkbox
                      checked={
                        selectedRoom.facilities.indexOf(c) !== -1 ? true : false
                      }
                      onChange={(e) => {
                        if (e.target.checked == true) {
                          handleAdd(c);
                        } else {
                          handleRemove(c);
                        }
                      }}
                    />
                  }
                  label={c.name}
                />
              );
            }
          })}
        {isEdit == false &&
          selectedRoom?.facilities?.length > 0 &&
          selectedRoom.facilities.map((c) => {
            if (c.type != "Amenity") {
              return <Typography key={c.id}>{c.name}</Typography>;
            }
          })}
      </Stack>
    </Box>
  );
}
export default ChooseRoomFacility;
