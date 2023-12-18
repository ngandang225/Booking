import * as React from "react";
import CheckOutStep from "./CheckOutStep";
import { Stack, Button, Alert, Snackbar } from "@mui/material";
import RoomInfor from "./RoomInfor";
import PriceInfor from "./PriceInfor";
import OrderInfor from "./OrderInfor";
import PersonalInfor from "./PersonalInfor";
import ChosenInfor from "./ChosenRooms";
import SuccessDialog from "./SuccessDialog";
import RejectDialog from "./RejectDialog";
import { useLocation } from "react-router-dom";
import { orderServices } from "../../services/order-services/orderServices";
import "./CheckOut.scss";

function CheckOut() {
  const [openError, setOpenError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const [openRejectDialog, setOpenRejectDialog] = React.useState(false);
  const location = useLocation();
  const [userInfor, setUserInfor] = React.useState({
    name: "",
    phone: "",
    email: "",
  });
  const infor = JSON.parse(location?.state.infor);
  const handleCloseAlert = () => {
    setOpenError(false);
  };
  const PhoneValidation = (phone) => {
    // Remove any non-digit characters
    const cleanedNumber = phone.replace(/\D/g, "");

    // Check if the cleaned number has 10 digits and starts with '0'
    const isValid = /^0\d{9}$/.test(cleanedNumber);

    return isValid;
  };
  const EmailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    const isValid = emailRegex.test(email);

    return isValid;
  };
  const handleCheckout =async () => {
    let user = localStorage.getItem("user");
    if (user=='null') {
      setOpenError(true);
      setErrorMessage("Bạn vui lòng đăng nhập trước khi thanh toán");
    } else {
      if (
        userInfor.name === "" ||
        userInfor.phone === "" ||
        userInfor.email === ""
      ) {
        setOpenError(true);
        setErrorMessage("Bạn vui lòng điền đầy đủ các thông tin");
      } else {
        if (
          !PhoneValidation(userInfor.phone) ||
          !EmailValidation(userInfor.email)
        ) {
          setOpenError(true);
          setErrorMessage("SĐT hoặc Email đang sai cú pháp");
        }
        else
        {
          const roomItems = infor.selectedRooms.map(r=>({
            room_Id:r.id,
            user_Id:user.id,
            order:null,
            price:r.price
          }))
          const order={
            user_Id:user.id,
            status:"Pending",
            email:userInfor.email,
            order_Date:Date.now,
            check_In_Date:infor.bookInfor.startDate,
            check_Out_Date:infor.bookInfor.endDate,
            orderItems:roomItems
          }
          const data= await orderServices.createOrder(order);
          if(data?.data!=null)
          {
            setOpenSuccessDialog(true);
          }
          else if(data?.error !=null){
            setOpenRejectDialog(true);
          }
        }
      }
    }
  };
  return (
    <div id="container">
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <CheckOutStep />
      {openSuccessDialog && <SuccessDialog openDialog={openSuccessDialog} closeDialog={setOpenSuccessDialog}></SuccessDialog>}
      {openRejectDialog && <RejectDialog openDialog={openRejectDialog} closeDialog={setOpenRejectDialog} />}
      <div>
        <Stack direction="row" spacing={10}>
          <div id="left">
            <Stack direction="column" spacing={3}>
              <RoomInfor property={infor.property}></RoomInfor>
              <OrderInfor bookInfor={infor.bookInfor}></OrderInfor>
              <PriceInfor priceInfor={infor.priceInfor}></PriceInfor>
            </Stack>
          </div>
          <div id="right">
            <Stack direction="column" spacing={3}>
              <PersonalInfor
                userInfor={userInfor}
                setUserInfor={setUserInfor}
                PhoneValidation={PhoneValidation}
                EmailValidation={EmailValidation}
              ></PersonalInfor>
              <ChosenInfor rooms={infor.selectedRooms}></ChosenInfor>
            </Stack>
          </div>
        </Stack>
      </div>
      <div
        style={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <Button
          onClick={() => {
            handleCheckout();
          }}
          sx={{ marginTop: 4, marginBottom: 4 }}
          variant="contained"
        >
          Đặt ngay
        </Button>
      </div>
    </div>
  );
}
export default CheckOut;
