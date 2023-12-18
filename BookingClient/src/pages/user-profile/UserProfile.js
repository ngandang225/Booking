import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { userServices } from "../../services/userServices";
import { orderServices } from "../../services/orderServices";
import priceFormat from "../../services/priceFormat";

import "./UserProfile.scss";

function UserProfile() {
  const [user, setUsers] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [isEditingInfo, setIsEditingInfo] = React.useState(false);
  const [cancelInfo, setCancelInfo] = React.useState(false);
  const [isEditingPassword, setIsEditingPassword] = React.useState(false);

  const [fullnameInput, setFullnameInput] = React.useState({
    value: user && user.fullname,
    errorMessage: "",
  });
  const [phoneNumberInput, setPhoneNumberInput] = React.useState({
    value: user && user.phoneNumber,
    errorMessage: "",
  });
  const [emailInput, setEmailInput] = React.useState({
    value: user && user.email,
    errorMessage: "",
  });
  const [addressInput, setAddressInput] = React.useState({
    value: user && user.address,
    errorMessage: "",
  });
  const [currentPasswordInput, setCurrentPasswordInput] = React.useState({
    value: "",
    errorMessage: "",
    isShow: false
  });
  const [passwordInput, setPasswordInput] = React.useState({
    value: "",
    errorMessage: "",
    isShow: false,
  });
  const [rePasswordInput, setRePasswordInput] = React.useState({
    value: "",
    errorMessage: "",
    isShow: false,
  });
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const handleClickEdit = () => {
    setIsEditingInfo(true);
  };
  const updateInfo = (user) => {
    let updatedInfo = {
      id: user.id,
      fullname: fullnameInput.value,
      phoneNumber: phoneNumberInput.value,
      email: emailInput.value,
      address: addressInput.value,
    };
    userServices.updateUser(updatedInfo).then((data) => {
      setUsers(data);
      localStorage.setItem("user", JSON.stringify(data));
    });
  };
  const handleClickSave = () => {
    let val = validateFullname();
    val = validatePhoneNumber() && val;
    val = validateAddress() && val;
    val = validateEmail() && val;
    if (val) {
      updateInfo(user);
      setIsEditingInfo(false);
    }
  };
  const handleClickCancelInfo = () => {
    // Return the value before changing
    setFullnameInput({ value: user.fullname, errorMessage: "" });
    setPhoneNumberInput({ value: user.phoneNumber, errorMessage: "" });
    setEmailInput({ value: user.email, errorMessage: "" });
    setAddressInput({ value: user.address, errorMessage: "" });
  };
  const handleClickCancelPassword = () => {
    setCurrentPasswordInput({ value: "", errorMessage: "" });
    setPasswordInput({ value: "", errorMessage: "" });
    setRePasswordInput({ value: "", errorMessage: "" });
  }
  const changePassword = (user) => {
    let validated = validatePassword() && validateRePassword();
    if (validated) {
      let updatedPassword = {
        id: user.id,
        currentPassword: currentPasswordInput.value,
        newPassword: passwordInput.value,
      };
      userServices.changePassword(updatedPassword).then((data) => {
        if (data.constructor === String && data === "Wrong old password") {
          setCurrentPasswordInput({
            ...currentPasswordInput,
            errorMessage: "Mật khẩu hiện tại không chính xác",
          });
        } else if (data.constructor === Object) {
          setCurrentPasswordInput({
            ...currentPasswordInput,
            errorMessage: "",
          });
          localStorage.setItem("user", JSON.stringify(data));
          setIsSuccessful(true);
        }
      });
    }
  };
  const handleClickChangePassword = () => {
    if (currentPasswordInput.value !== "") {
      changePassword(user);
      setIsEditingPassword(false);
    } else if (currentPasswordInput.value === "") {
      setCurrentPasswordInput({ ...currentPasswordInput, errorMessage: "Vui lòng nhập mật khẩu hiện tại" });
    }
  };

  // Validate fullname
  const validateFullname = () => {
    if (fullnameInput.value === "") {
      setFullnameInput({
        ...fullnameInput,
        errorMessage: "Vui lòng điền họ và tên",
      });
      return false;
    }
    setFullnameInput({ ...fullnameInput, errorMessage: "" });
    return true;
  };
  // Validate phone number
  const validatePhoneNumber = () => {
    if (phoneNumberInput.value === "") {
      setPhoneNumberInput({
        ...phoneNumberInput,
        errorMessage: "Vui lòng điền số điện thoại",
      });
      return false;
    }
    let formatted = phoneNumberInput.value
      .toLowerCase()
      .match(/^(0|84)(3[2-9]|5[689]|7[06-9]|8[0-9]|9[0-9])[0-9]{7}$/);
    if (!formatted) {
      setPhoneNumberInput({
        ...phoneNumberInput,
        errorMessage: "Số điện thoại không hợp lệ",
      });
      return false;
    }

    setPhoneNumberInput({ ...phoneNumberInput, errorMessage: "" });

    return true;
  };

  // Validate email
  const validateEmail = () => {
    if (emailInput.value === "") {
      setEmailInput({
        ...emailInput,
        errorMessage: "Vui lòng điền email",
      });
      return false;
    }

    let formatted = emailInput.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!formatted) {
      setEmailInput({
        ...emailInput,
        errorMessage: "Email không tồn tại",
      });
      return false;
    }

    setEmailInput({ ...emailInput, errorMessage: "" });

    return true;
  };
  // Validate address
  const validateAddress = () => {
    if (addressInput.value === "") {
      setAddressInput({
        ...addressInput,
        errorMessage: "Vui lòng điền địa chỉ",
      });
      return false;
    }
    setAddressInput({ ...addressInput, errorMessage: "" });
    return true;
  };
  const handleClickShowCurrentPassword = () =>
    setCurrentPasswordInput({ ...currentPasswordInput, isShow: !currentPasswordInput.isShow });
  // Validate password
  const validatePassword = () => {
    if (passwordInput.value === "") {
      setPasswordInput({
        ...passwordInput,
        errorMessage: "Vui lòng nhập mật khẩu",
      });

      return false;
    }
    let formatted = passwordInput.value
      .toLowerCase()
      .match(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/);
    if (!formatted) {
      setPasswordInput({
        ...passwordInput,
        errorMessage: "Mật khẩu phải bao gồm chữ và số, có ít nhất 8 ký tự",
      });
      return false;
    }

    setPasswordInput({ ...passwordInput, errorMessage: "" });
    return true;
  };
  const handleClickShowPassword = () =>
    setPasswordInput({ ...passwordInput, isShow: !passwordInput.isShow });

  // Validate re-password
  const validateRePassword = () => {
    if (rePasswordInput.value === "") {
      setRePasswordInput({
        ...rePasswordInput,
        errorMessage: "Vui lòng xác nhận mật khẩu",
      });
      return false;
    }
    if (passwordInput.value !== rePasswordInput.value) {
      setRePasswordInput({
        ...rePasswordInput,
        errorMessage: "Mật khẩu không khớp",
      });
      return false;
    }

    setRePasswordInput({ ...rePasswordInput, errorMessage: "" });
    return true;
  };
  const handleClickShowRePassword = () =>
    setRePasswordInput({ ...rePasswordInput, isShow: !rePasswordInput.isShow });

    // Funtion related to order history
    const changeDateFormat = (datetimeString) => {
      const datetime = new Date(datetimeString);
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = datetime.toLocaleDateString("en-GB", options);
      return formattedDate;
    }

    const [orders, setOrders] = React.useState(null);
    React.useEffect(() => {
      orderServices.getOrdersByUserId(user.id).then((data) => {
        setOrders(data);
      });
    }, []);
  return (
    <div id="user-profile-wrapper">
      <Typography variant="h4" className="title">
        Tài khoản và lịch sử đặt phòng
      </Typography>
      <div id="user-profile-body">
        <div id="user-info-container">
          <Box
            className="user-info"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "auto" },
              marginBottom: "40px",
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h5" className="small-title">
              Thông tin tài khoản
            </Typography>
            <Box className="input">
              <InputLabel required htmlFor="fullname">
                Họ và tên:
              </InputLabel>
              <OutlinedInput
                value={fullnameInput.value || ""}
                fullWidth
                required
                disabled={!isEditingInfo}
                onChange={(event) => {
                  setFullnameInput({
                    ...fullnameInput,
                    value: event.target.value,
                  });
                  setCancelInfo(true);
                }}
                onBlur={validateFullname}
                id="fullname"
                type="text"
              />
              {fullnameInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {fullnameInput.errorMessage}
                </FormHelperText>
              )}
            </Box>
            <Box className="input">
              <InputLabel required htmlFor="phone-number">
                Số điện thoại:
              </InputLabel>
              <OutlinedInput
                value={phoneNumberInput.value || ""}
                fullWidth
                required
                disabled={!isEditingInfo}
                onChange={(event) => {
                  setPhoneNumberInput({
                    ...phoneNumberInput,
                    value: event.target.value,
                  });
                  setCancelInfo(true);
                }}
                onBlur={validatePhoneNumber}
                id="phone-number"
                type="text"
              />
              {phoneNumberInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {phoneNumberInput.errorMessage}
                </FormHelperText>
              )}
            </Box>
            <Box className="input">
              <InputLabel required htmlFor="email">
                Email:
              </InputLabel>
              <OutlinedInput
                value={emailInput.value || ""}
                fullWidth
                required
                disabled={!isEditingInfo}
                onChange={(event) => {
                  setEmailInput({ ...emailInput, value: event.target.value });
                  setCancelInfo(true);
                }}
                onBlur={validateEmail}
                id="email"
                type="text"
              />
              {emailInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {emailInput.errorMessage}
                </FormHelperText>
              )}
            </Box>
            <Box className="input">
              <InputLabel required htmlFor="address">
                Địa chỉ:
              </InputLabel>
              <OutlinedInput
                value={addressInput.value || ""}
                fullWidth
                required
                disabled={!isEditingInfo}
                onChange={(event) => {
                  setAddressInput({
                    ...addressInput,
                    value: event.target.value,
                  });
                  setCancelInfo(true);
                }}
                onBlur={validateAddress}
                id="address"
                type="text"
              />
              {addressInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {addressInput.errorMessage}
                </FormHelperText>
              )}
            </Box>

            <div className="button-wrapper">
              <div className="button-container">
                {!isEditingInfo ? (
                  <Button
                    className="button-edit"
                    variant="contained"
                    sx={{
                      backgroundColor: "primary.main",
                      boxShadow: "none",
                    }}
                    onClick={handleClickEdit}
                  >
                    Chỉnh sửa
                  </Button>
                ) : (
                  <div className="button-container-2">
                    {cancelInfo && (
                      <Button
                        sx={{
                          bgcolor: "white",
                          color: "primary.main",
                          ":hover": {
                            color: "white",
                          },
                          border: "0.05rem solid rgba(0,0,0,0.1)",
                        }}
                        onClick={handleClickCancelInfo}
                        variant="contained"
                        disableElevation //
                      >
                        Hủy
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "primary.main",
                        boxShadow: "none",
                        marginLeft: "40px",
                      }}
                      onClick={handleClickSave}
                    >
                      Lưu
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Box>

          {/* Change password */}
          <Box
            className="user-info"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "auto" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h5" className="small-title">
              Đổi mật khẩu
            </Typography>
            <Box className="input">
              <InputLabel required htmlFor="password">
                Mật khẩu hiện tại:
              </InputLabel>
              <OutlinedInput
                fullWidth
                required
                id="password"
                value={currentPasswordInput.value}
                onChange={(event) => {
                  setCurrentPasswordInput({
                    ...currentPasswordInput,
                    value: event.target.value,
                    errorMessage: ""
                  });
                  setIsEditingPassword(true);
                }}
                error={currentPasswordInput.errorMessage !== ""}
                type={currentPasswordInput.isShow ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {currentPasswordInput.isShow ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {currentPasswordInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {currentPasswordInput.errorMessage}
                </FormHelperText>
              )}
            </Box>
            <Box className="input">
              <InputLabel required htmlFor="new-password">
                Mật khẩu mới:
              </InputLabel>
              <OutlinedInput
                fullWidth
                required
                id="new-password"
                value={passwordInput.value}
                onChange={(event) => {
                  setPasswordInput({
                    ...passwordInput,
                    value: event.target.value,
                  });
                  setIsEditingPassword(true);
                }}
                onBlur={() => {
                  if (currentPasswordInput.value !== "") {
                    validatePassword();
                  }
                }}
                error={passwordInput.errorMessage !== ""}
                type={passwordInput.isShow ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {passwordInput.isShow ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {passwordInput.errorMessage}
                </FormHelperText>
              )}
            </Box>
            <Box className="input">
              <InputLabel required htmlFor="re-password">
                Nhập lại mật khẩu mới:
              </InputLabel>
              <OutlinedInput
                fullWidth
                required
                id="re-password"
                value={rePasswordInput.value}
                onBlur={() => {
                  if (currentPasswordInput.value !== "") {
                    validateRePassword();
                  }
                }}
                onChange={(event) => {
                  setRePasswordInput({
                    ...rePasswordInput,
                    value: event.target.value,
                  });
                  setIsEditingPassword(true);
                }}
                error={rePasswordInput.errorMessage !== ""}
                type={rePasswordInput.isShow ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRePassword}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {rePasswordInput.isShow ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {rePasswordInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {rePasswordInput.errorMessage}
                </FormHelperText>
              )}
            </Box>
            <div className="button-wrapper">
              <div className="button-container">
              {isEditingPassword && (
                <div className="button-container-2">
                <Button
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    ":hover": {
                      color: "white",
                    },
                    border: "0.05rem solid rgba(0,0,0,0.1)",
                  }}
                  variant="contained"
                  disableElevation
                  onClick={handleClickCancelPassword}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.main",
                    boxShadow: "none",
                    marginLeft: "40px",
                  }}
                  onClick={handleClickChangePassword}
                >
                  Lưu
                </Button>
              </div>
              )}
              </div>
            </div>
            {isSuccessful && !isEditingPassword && (
                <FormHelperText error id="component-error-text">
                  Đã đổi mật khẩu thành công
                </FormHelperText>
              )}
          </Box>
        </div>
        
        <div id="order-history-container">
          <Box id="order-history">
            <Typography variant="h5" className="small-title">
              Lịch sử đặt phòng
            </Typography>
            {orders && orders.map((order, index) => (
              <Box
              key={index}
              className="order-list"
              sx={{
                "& .MuiTextField-root": { m: 3, width: "auto" },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography variant="body1">
                {`${changeDateFormat(order.check_In_Date)} - ${changeDateFormat(order.check_Out_Date)}`}
              </Typography>
              <Box>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h6">{order.orderItems[0].room.property.name}</Typography>
                  <Typography variant="h6">
                    {`Tổng: ${priceFormat(order.orderItems.reduce((total, item) => {
                      return total + item.price;
                    }, 0))} VND`}
                  </Typography>
                </Stack>
                <Box
                  direction="column"
                  borderLeft="1px solid rgba(0, 0, 0, 0.2)"
                  padding="16px"
                  >
                  {order.orderItems.map((orderItem, index) => (
                    <Stack direction="row" className="order-detail" key={index}>
                    <img
                      className="image"
                      alt="Phân Ương hotel"
                      src={orderItem.room.images[0]}
                    ></img>
                    <Stack direction="column" marginLeft="16px">
                      <Stack>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          marginBottom="4px"
                        >
                          {`Phòng ${orderItem.room.room_Number} - ${orderItem.room.name}`}
                        </Typography>
                        <Typography variant="body1" marginBottom="4px">
                          {orderItem.room.double_Bed > 0 && `${orderItem.room.double_Bed} giường đôi`}
                          {orderItem.room.single_Bed > 0 && `, ${orderItem.room.single_Bed} giường đơn`}
                        </Typography>
                        <Typography variant="body1" marginBottom="16px">
                          {`Diện tích: ${orderItem.room.area}, Tầng ${orderItem.room.floor}`}
                        </Typography>
                      </Stack>
                      <Typography variant="body1">{`${priceFormat(orderItem.room.price)} VND/đêm`}</Typography>
                    </Stack>
                  </Stack>
                    ))}
                </Box>
              </Box>
            </Box>
            ))}
          </Box>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
