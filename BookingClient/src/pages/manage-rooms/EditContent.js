import * as React from "react";
import { Stack, Typography, Button } from "@mui/material";
import EditRoomInfor from "./EditRoomInfor";
import ChooseRoomFacility from "./ChooseRoomFacility";
import EditRoomImage from "./EditRoomImage";
import EditRoomPrice from "./EditRoomPrice";
import { Delete } from "@mui/icons-material";
import { roomServices } from "../../services/room-services/roomServices";
function EditContent({
  setOpenEdit,
  setSelectedRoom,
  selectedRoom,
  setIsEdit,
  isEdit,
}) {
  const roomUpdate = roomServices.useUpdateRoom();
  return (
    <>
      <h3
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOpenEdit(false);
          setSelectedRoom(null);
        }}
      >
        Về danh sách phòng
      </h3>

      <h2 style={{ marginLeft: "11%", marginTop: "46px" }}>
        Thông tin phòng:{selectedRoom.room_Number}
      </h2>
      <Stack direction="row" spacing={"13%"}>
        {/* left */}
        <EditRoomInfor
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
        {/* Right */}
        <ChooseRoomFacility
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      </Stack>
      <EditRoomImage
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <EditRoomPrice
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      {isEdit == true && (
        <Stack
          direction={"row"}
          sx={{ width: "95%", marginTop: "121px", marginBottom: "189px" }}
          justifyContent={"space-between"}
        >
          <Button
            onClick={() => {
              setIsEdit(false);
              setOpenEdit(false);
              roomUpdate.mutate({
                ...selectedRoom,
                isDeleted: true,
                deletedAt: Date.now,
              });
            }}
            variant="outlined"
            startIcon={<Delete />}
          >
            Xóa Phòng
          </Button>
          <Button
            variant="contained"
            sx={{ width: "25%" }}
            onClick={() => {
              console.log(selectedRoom);
              setIsEdit(false);
              roomUpdate.mutate(selectedRoom);
            }}
          >
            Lưu
          </Button>
        </Stack>
      )}
    </>
  );
}
export default EditContent;
