import * as React from "react";
import { Stack, Box, TextField, Divider } from "@mui/material";
import priceFormat from "../../services/priceFormat";
import { validateNumberInput } from "../../services/property-services/utils";
function EditRoomPrice({ isEdit, setSelectedRoom, selectedRoom }) {
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: "12px",
        width: "40%",
        marginTop: "25px",
        marginBottom: isEdit == false ? "189px" : "0px",
      }}
    >
      <Stack sx={{ marginLeft: "11%", marginBottom: "43px" }}>
        <h4>{`Giá phòng(mỗi đêm)(*)`}</h4>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ maxHeight: "40px" }}
        >
          <Box
            sx={{
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "13%",
            }}
          >
            <p>VND</p>
          </Box>
          {isEdit == true && (
            <TextField
              size="small"
              variant="outlined"
              value={selectedRoom.price}
              onChange={(e) => {
                if (validateNumberInput(e.target.value)) {
                  setSelectedRoom({
                    ...selectedRoom,
                    price: parseFloat(e.target.value),
                  });
                }
              }}
            />
          )}
          {isEdit == false && (
            <Box
              sx={{
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
              }}
            >
              <p>{priceFormat(selectedRoom.price)}</p>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default EditRoomPrice;
