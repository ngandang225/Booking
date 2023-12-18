import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { userServices } from "../../services/userServices";

import "./SignUpLandlord.scss";

function SignUpLandlord() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [checkbox, setCheckbox] = React.useState({
    isChecked: false,
    errorMessage: "",
  });
  const [fullnameInput, setFullnameInput] = React.useState({
    value: "",
    errorMessage: "",
  });
  const [phoneNumberInput, setPhoneNumberInput] = React.useState({
    value: "",
    errorMessage: "",
  });
  const [addressInput, setAddressInput] = React.useState({
    value: "",
    errorMessage: "",
  });

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

  // Validate checkbox
  const validateCheckbox = () => {
    if (!checkbox.isChecked) {
      setCheckbox({
        ...checkbox,
        errorMessage:
          "Cần đồng ý với điều khoản của Travel Ease để bắt đầu kinh doanh.",
      });
      return false;
    }
    setCheckbox({ ...checkbox, errorMessage: "" });
    return true;
  };

  const handleCheckboxChange = (event) => {
    setCheckbox({
      ...checkbox,
      isChecked: event.target.checked,
      errorMessage: "",
    });
  };

  const changeRole = (user) => {
    let landlordRole = {
      id: user.id,
      role_id: 2,
    };
    userServices.updateUser(landlordRole).then((data) => {
      setUser(data);
    });
  };

  const handleClick = () => {
    let val = validateFullname();
    val = validatePhoneNumber() && val;
    val = validateAddress() && val;
    val = validateCheckbox() && val;
    if (val) {
      user && changeRole(user);
    }
  };

  return (
    <div id="sign-up-landlord-wrapper">
      <Typography variant="h4" className="title">
        Đăng ký tài khoản đối tác
      </Typography>

      <Box id="sign-up-landlord-body">
        {/* Landlord info */}
        <Box
          className="body-item"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3, width: "auto" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5" className="small-title">
            Thông tin chủ sở hữu
          </Typography>
          <Box className="input">
            <InputLabel
              required
              htmlFor="fullname"
              error={fullnameInput.errorMessage !== ""}
            >
              Họ và tên:
            </InputLabel>
            <OutlinedInput
              value={fullnameInput.value}
              onChange={(event) => {
                setFullnameInput({
                  ...fullnameInput,
                  value: event.target.value,
                });
              }}
              onBlur={validateFullname}
              fullWidth
              required
              id="fullname"
              type="text"
              error={fullnameInput.errorMessage !== ""}
            />
            <FormHelperText error={fullnameInput.errorMessage !== ""}>
              {fullnameInput.errorMessage !== ""
                ? "Vui lòng nhập họ và tên."
                : ""}
            </FormHelperText>
          </Box>
          <Box className="input">
            <InputLabel
              required
              htmlFor="phone-number"
              error={phoneNumberInput.errorMessage !== ""}
            >
              Số điện thoại:
            </InputLabel>
            <OutlinedInput
              value={phoneNumberInput.value}
              onChange={(event) => {
                setPhoneNumberInput({
                  ...phoneNumberInput,
                  value: event.target.value,
                });
              }}
              onBlur={validatePhoneNumber}
              fullWidth
              required
              id="phone-number"
              type="text"
              error={phoneNumberInput.errorMessage !== ""}
            />
            {phoneNumberInput.errorMessage !== "" && (
              <FormHelperText
                error={phoneNumberInput.errorMessage !== ""}
                id="component-error-text"
              >
                {phoneNumberInput.errorMessage}
              </FormHelperText>
            )}
          </Box>
          <Box className="input">
            <InputLabel
              required
              htmlFor="address"
              error={addressInput.errorMessage !== ""}
            >
              Địa chỉ:
            </InputLabel>
            <OutlinedInput
              value={addressInput.value}
              onChange={(event) => {
                setAddressInput({ ...addressInput, value: event.target.value });
              }}
              onBlur={validateAddress}
              fullWidth
              required
              id="address"
              type="text"
              error={addressInput.errorMessage !== ""}
            />
            <FormHelperText error={addressInput.errorMessage !== ""}>
              {addressInput.errorMessage !== ""
                ? "Vui lòng nhập địa chỉ của bạn."
                : ""}
            </FormHelperText>
          </Box>
        </Box>

        {/* Contract */}
        <Box
          className="body-item"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3, width: "auto" },
          }}
        >
          <Typography variant="h5" className="small-title">
            Hợp đồng cam kết
          </Typography>
          <Typography variant="body1">
            Tất cả thông tin của chủ sỡ hữu chỗ nghỉ và thông tin chỗ nghỉ cần
            được cung cấp chính xác...
          </Typography>
          <Box className="contract-sign">
            <Checkbox required onChange={handleCheckboxChange} />
            <Typography variant="body1">Tôi đã hiểu</Typography>
          </Box>
          <FormHelperText error={checkbox.errorMessage !== ""}>
            {checkbox.errorMessage !== ""
              ? "Cần đồng ý với điều khoản của Travel Ease để bắt đầu kinh doanh."
              : ""}
          </FormHelperText>
        </Box>
      </Box>

      <Button
        className="continue-btn"
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          boxShadow: "none",
        }}
        onClick={handleClick}
      >
        Tiếp theo
      </Button>
    </div>
  );
}

export default SignUpLandlord;
