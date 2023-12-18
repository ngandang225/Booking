import * as React from "react";
import { Stack, Button, Typography ,CircularProgress} from "@mui/material";
import { Add } from "@mui/icons-material";
import AddDialog from "./AddDialog";
import ViewContent from "./ViewContent";
import EditContent from "./EditContent";
import { propertyServices } from "../../services/property-services/propertyService";
import { roomServices } from "../../services/room-services/roomServices";
function ManageRoom() {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(null);
  const [newRoomNumber, setNewRoomNumber] = React.useState(0);
  const property = propertyServices.usePropertyById(1, null);
  const roomMutation = roomServices.useAddRoom();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAddRoom = () => {
    let newRoom = {
      id: 0,
      name: "string",
      property_Id: 1,
      type_Id: 1,
      single_Bed: 0,
      double_Bed: 0,
      room_Number: newRoomNumber,
      floor: 0,
      area: 0,
      reviewScore: 0,
      price: 0,
      description: "string",
      isAvailable: true,
      images: [],
      reviews: null,
      orderItems: null,
      facilities: null,
      property: null,
      priceLists: null,
      roomType: null,
    };
    roomMutation.mutate(newRoom);
  };
  const getFloors = () => {
    const tempFloors = [];
    if (property?.isSuccess) {
      property.data.rooms.map((r) => {
        if (!tempFloors.includes(r.floor)) {
          tempFloors.push(r.floor);
        }
      });
    }
    return tempFloors;
  };
  const floors = getFloors();
  return (
    <>
      <AddDialog
        open={open}
        setOpen={setOpen}
        roomNumber={newRoomNumber}
        setRoomNumber={setNewRoomNumber}
        handleAddRoom={handleAddRoom}
      />
      {/* Header */}
      <div
        style={{
          marginTop: "66px",
          display: "flex",
          justifyContent:
            openEdit == false || isEdit == false ? "end" : "center",
          alignItems: "center",
          marginRight: "80px",
        }}
      >
        <Stack
          direction="row"
          sx={
            openEdit == false || isEdit == false
              ? { alignItems: "center" }
              : { alignItems: "center", justifyContent: "center" }
          }
          spacing={openEdit == false || isEdit == false ? "300px" : "0px"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >

              <h1>THÔNG TIN PHÒNG Ở</h1>

              <p>Khách sạn Phân Ương - Khách sạn tình yêu số 1 Đà Lạt</p>

          </div>
          {openEdit == true && isEdit == false && (
            <Button
              sx={{ maxHeight: "30px" }}
              variant="contained"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Chỉnh sửa
            </Button>
          )}
          {openEdit == false && (
            <Button
              sx={{ maxHeight: "30px" }}
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                handleClickOpen();
              }}
            >
              Phòng mới
            </Button>
          )}
        </Stack>
      </div>
      {/* Content */}
      <div style={{ marginLeft: "6%", marginTop: "100px" }}>
        {property?.isFetching && property?.isPending &&(
          <CircularProgress />
        )}
        {property?.isSuccess && openEdit == false && (
          <ViewContent
            rooms={property.data.rooms}
            floors={floors}
            setOpenEdit={setOpenEdit}
            setSelectedRoom={setSelectedRoom}
          />
        )}
        {openEdit == true && selectedRoom != null && (
          <EditContent
            setOpenEdit={setOpenEdit}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          ></EditContent>
        )}
      </div>
    </>
  );
}
export default ManageRoom;
