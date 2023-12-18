import * as React from "react";
import "./CheckOut.scss";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  TextField,
  Autocomplete,
  Divider,
  CardHeader,
} from "@mui/material";
const hoursList = [
  { label: "1h00 - 2h00", value: { from: 1, to: 2 } },
  { label: "2h00 - 3h00", value: { from: 2, to: 3 } },
  { label: "3h00 - 4h00", value: { from: 3, to: 4 } },
  { label: "4h00 - 5h00", value: { from: 4, to: 5 } },
  { label: "5h00 - 6h00", value: { from: 5, to: 6 } },
  { label: "6h00 - 7h00", value: { from: 6, to: 7 } },
  { label: "7h00 - 8h00", value: { from: 7, to: 8 } },
  { label: "8h00 - 9h00", value: { from: 8, to: 9 } },
  { label: "9h00 - 10h00", value: { from: 9, to: 10 } },
  { label: "10h00 - 11h00", value: { from: 10, to: 11 } },
  { label: "11h00 - 12h00", value: { from: 11, to: 12 } },
  { label: "12h00 - 13h00", value: { from: 12, to: 13 } },
  { label: "13h00 - 14h00", value: { from: 13, to: 14 } },
  { label: "14h00 - 15h00", value: { from: 14, to: 15 } },
  { label: "15h00 - 16h00", value: { from: 15, to: 16 } },
  { label: "16h00 - 17h00", value: { from: 16, to: 17 } },
  { label: "17h00 - 18h00", value: { from: 17, to: 18 } },
  { label: "18h00 - 19h00", value: { from: 18, to: 19 } },
  { label: "19h00 - 20h00", value: { from: 19, to: 20 } },
  { label: "20h00 - 21h00", value: { from: 20, to: 21 } },
  { label: "21h00 - 22h00", value: { from: 21, to: 22 } },
  { label: "22h00 - 23h00", value: { from: 22, to: 23 } },
  { label: "23h00 - 24h00", value: { from: 23, to: 24 } },
  { label: "24h00 - 1h00", value: { from: 24, to: 1 } },
];
export default function PersonalInfor({
  userInfor,
  setUserInfor,
  PhoneValidation,
  EmailValidation,
}) {
  return (
    <Card id="personal-infor">
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            color: "#000000",
            marginBottom: 3,
          }}
          color="text.secondary"
          gutterBottom
        >
          Thông tin cá nhân
        </Typography>
        <Stack sx={{ marginBottom: 2 }} direction="row" spacing={12} fullWidth>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "50%",
            }}
          >
            <Typography>Họ và tên</Typography>
            <TextField
              value={userInfor.name}
              onChange={(e) => {
                setUserInfor({ ...userInfor, name: e.target.value });
              }}
              fullWidth
              sx={{ marginTop: 1 }}
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "50%",
            }}
          >
            <Typography>Số điện thoại</Typography>
            <TextField
              error={!PhoneValidation(userInfor.phone) ? true : false}
              helperText={!PhoneValidation(userInfor.phone) ? "Vui lòng điền đúng sđt" : ""}
              value={userInfor.phone}
              onChange={(e) => {
                setUserInfor({ ...userInfor, phone: e.target.value });
              }}
              fullWidth
              sx={{ marginTop: 1 }}
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
            />
          </div>
        </Stack>
        <Stack direction="row" spacing={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "50%",
            }}
          >
            <Typography>Địa chỉ Email</Typography>
            <TextField
              error={!EmailValidation(userInfor.email) ? true : false}
              helperText={!EmailValidation(userInfor.email) ? "Vui lòng điền đúng email" : ""}
              value={userInfor.email}
              onChange={(e) => {
                setUserInfor({ ...userInfor, email: e.target.value });
              }}
              fullWidth
              sx={{ marginTop: 1 }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "50%",
            }}
          >
            <Typography>Giờ nhận phòng</Typography>
            <Autocomplete
              fullWidth
              sx={{ marginTop: 1 }}
              id="country-select-demo"
              options={hoursList}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Giờ nhận phòng"
                  variant="filled"
                  size="small"
                />
              )}
            />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
