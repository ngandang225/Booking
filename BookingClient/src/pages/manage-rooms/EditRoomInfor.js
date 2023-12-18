import * as React from "react";
import {
  Stack,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import Counter from "./Counter";
import { validateNumberInput } from "../../services/property-services/utils";
import { roomTypeServices } from "../../services/room-type-services.js/roomTypeServices";
function EditRoomInfor({ setIsEdit, isEdit, setSelectedRoom, selectedRoom }) {
  console.log(selectedRoom);
  const roomTypes = roomTypeServices.useAllRoomTypes();
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: "12px",
        width: "40%",
        maxHeight: "850px",
      }}
    >
      <Stack
        direction={"row"}
        spacing={"180px"}
        sx={{
          marginTop: "25px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction={"column"} spacing={2} sx={{ width: "20%" }}>
          <h4 style={{ margin: 0 }}>{` Số phòng(*)`}</h4>
          {isEdit == false && (
            <Box
              sx={{
                border: 1,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "65px",
              }}
            >
              {selectedRoom.room_Number}
            </Box>
          )}
          {isEdit == true && (
            <TextField
              sx={{
                borderRadius: "10px",
                height: "65px",
                maxWidth: "100px",
              }}
              value={selectedRoom.room_Number}
              onChange={(e) => {
                if (validateNumberInput(e.target.value)) {
                  setSelectedRoom({
                    ...selectedRoom,
                    room_Number: parseInt(e.target.value),
                  });
                }
              }}
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          )}
        </Stack>
        <Stack direction={"column"} spacing={2} sx={{ width: "20%" }}>

            <h4 style={{ margin: 0 }}>{` Tầng(*)`}</h4>
          <Counter
            value={selectedRoom.floor}
            onChange={(count) => {
              setSelectedRoom({ ...selectedRoom, floor: count });
            }}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            sx={{
              border: 1,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "65px",
              flexDirection: "row",
            }}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          marginTop: "25px",
          width: "80%",
          marginLeft: "11%",
        }}
      >

          <h4>{` Loại phòng(*)`}</h4>

        {isEdit == true && (
          <FormControl>
            <InputLabel id="demo-simple-select-standard-label">
              Loại phòng
            </InputLabel>
            <Select
              value={
                roomTypes?.isSuccess
                  ? roomTypes.data.filter((c) => c.id == selectedRoom.id)[0]
                      ?.name
                  : ""
              }
              label="Loại phòng"
              labelId="demo-simple-select-standard-label"
              onChange={(e) => {
                setSelectedRoom({
                  ...selectedRoom,
                  type_Id: e.target.value.id,
                });
              }}
              sx={{
                borderRadius: "10px",

                height: "65px",
                maxWidth: "261px",
              }}
            >
              {roomTypes?.isSuccess &&
                roomTypes.data.map((rt) => {
                  return <MenuItem key={rt.id} value={rt}>{rt.name} </MenuItem>;
                })}
            </Select>
          </FormControl>
        )}
        {isEdit == false && (
          <Box
            sx={{
              border: 1,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              height: "65px",
            }}
          >
            <p style={{ marginLeft: "5%" }}>{selectedRoom.roomType.name}</p>
          </Box>
        )}
      </Stack>
      <Stack
        sx={{
          marginTop: "25px",
          width: "80%",
          marginLeft: "11%",
        }}
      >

          <h4>{` Tên phòng(*)`}</h4>

        {isEdit == true && (
          <TextField
            sx={{
              borderRadius: "10px",
              height: "65px",
              maxWidth: "400px",
            }}
            value={selectedRoom.name != null ? selectedRoom.name : "Tên phòng"}
            onChange={(e) => {
              setSelectedRoom({ ...selectedRoom, name: e.target.value });
            }}
            id="outlined-basic"
            label=""
            variant="outlined"
          />
        )}
        {isEdit == false && (
          <Box
            sx={{
              border: 1,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              height: "65px",
            }}
          >
            <p style={{ marginLeft: "5%" }}>
              {selectedRoom.name != null ? selectedRoom.name : "Tên phòng"}
            </p>
          </Box>
        )}
      </Stack>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          marginTop: "25px",
          width: "100%",
        }}
      >

          <h4
            style={{ margin: 0, marginLeft: "11%" }}
          >{` Loại giường và số lượng(*)`}</h4>

        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={2}
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            direction={"row"}
            spacing={"190px"}
          >
            <Typography>Giường Đơn</Typography>
            <Counter
              value={selectedRoom.single_Bed}
              onChange={(count) => {
                setSelectedRoom({ ...selectedRoom, single_Bed: count });
              }}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              sx={{
                border: 1,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "65px",
                flexDirection: "row",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            />
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            direction={"row"}
            spacing={"200px"}
          >
            <Typography>Giường Đôi</Typography>
            <Counter
              value={selectedRoom.double_Bed}
              onChange={(count) => {
                setSelectedRoom({ ...selectedRoom, double_Bed: count });
              }}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              sx={{
                border: 1,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "65px",
                flexDirection: "row",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          marginTop: "25px",
          width: "70%",
          marginLeft: "11%",
          marginBottom: "49px",
        }}
      >

          <h4>{` Diện tích(*)`}</h4>

        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
          }}
        >
          {isEdit == true && (
            <TextField
              value={selectedRoom.area}
              onChange={(e) => {
                if (validateNumberInput(e.target.value)) {
                  setSelectedRoom({
                    ...selectedRoom,
                    area: parseFloat(e.target.value),
                  });
                }
              }}
              sx={{
                borderRadius: "10px",
                height: "65px",
                maxWidth: "100px",
              }}
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          )}
          {isEdit == false && (
            <Box
              sx={{
                border: 1,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "65px",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              {selectedRoom.area}
            </Box>
          )}
          <Typography> Mét vuông</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default EditRoomInfor;
