import * as React from "react";
import {
  Stack,
  Button,
  Typography,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { validateNumberInput } from "../../services/property-services/utils";
function AddDialog({
  open,
  setOpen,
  roomNumber,
  setRoomNumber,
  handleAddRoom,
}) {
  const handleClose = () => setOpen(false);
  return (
    <Dialog fullWidth open={open} maxWidth="sm">
      <DialogTitle
        sx={{ m: 0, p: 2, borderBottom: 1 }}
        id="customized-dialog-title"
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography>Phòng ở mới</Typography>
          <Close onClick={handleClose} />
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "start",
            alignItems: "center",
            marginTop: "51px",
            marginLeft: "84px",
          }}
        >
          <strong style={{ marginBottom: "10px" }}>Số phòng:</strong>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            maxWidth: "475px",
            justifyContent: "start",
            alignItems: "center",
            marginLeft: "85px",
            paddingRight: "85px",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Số phòng"
            variant="outlined"
            value={roomNumber}
            onChange={(e) => {
              if (validateNumberInput(e.target.value)) {
                setRoomNumber(parseInt(e.target.value));
              }
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "63px",
            marginBottom: "57px",
          }}
        >
          {" "}
          <Button
            onClick={() => {
              setRoomNumber("0");
              handleAddRoom();
              handleClose();
            }}
            sx={{ maxWidth: "154px" }}
            variant="contained"
          >
            Tạo Phòng mới
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
export default AddDialog;
