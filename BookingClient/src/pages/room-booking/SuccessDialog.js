import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  DialogTitle,
  Stack,
} from "@mui/material";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";
const successLogo = require("../../assets/success.png");
export default function SuccessDialog({ openDialog, closeDialog }) {
  const [open, setOpen] = React.useState(openDialog);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    closeDialog(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <img src={successLogo} style={{ width: 148, aspectRatio: 1 }}></img>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#000000",
              marginBottom: 2,
              textAlign: "center",
            }}
            color="text.secondary"
            gutterBottom
          >
            Đặt phòng của bạn đã hoàn tất
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: "#000000",
              textAlign: "center",
            }}
            color="text.secondary"
            gutterBottom
          >
            Cảm ơn bạn đã tin tưởng
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: "#000000",
              marginBottom: 2,
              textAlign: "center",
            }}
            color="text.secondary"
            gutterBottom
          >
            Dịch vụ tại Bao Núc
          </Typography>
        </DialogContent>
        <DialogActions sx={{ marginBottom: 6 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              direction="row"
              spacing={7}
            >
              <Button
                sx={{ width: "35%", paddingLeft: 0, paddingRight: 0 }}
                variant="outlined"
                onClick={handleClose}
              >
                Xem lại đơn đặt phòng
              </Button>
              <Button
                sx={{ width: "35%", paddingLeft: 0, paddingRight: 0 }}
                variant="contained"
                onClick={() => {
                  navigate("/"+routes.listings);
                }}
                autoFocus
              >
                Xem thêm chỗ nghỉ khác
              </Button>
            </Stack>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
