import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { userServices } from "../../services/userServices";
function AuthenDialog({ open, onClose, type }) {
  //define states
  const [emailInput, setEmailInput] = React.useState({
    value: "",
    errorMessage: "",
  });
  const [username, setUsername] = React.useState({
    value: "",
    errorMessage: "",
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

  const [loginError, setLoginError] = React.useState("");

  //behaviors for email
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
  const handleChangeEmail = (event) => {
    setEmailInput({ ...emailInput, value: event.target.value });
  };

  //behaviors for userName
  const validateUsername = () => {
    if (username.value === "") {
      setUsername({
        ...username,
        errorMessage: "Vui lòng điền username",
      });
      return false;
    }
    setUsername({ ...username, errorMessage: "" });
    return true;
  };

  //behaviors for password
  const validatePassword = () => {
    if (type === "Đăng nhập") {
      if (passwordInput.value === "") {
        setPasswordInput({
          ...passwordInput,
          errorMessage: "Vui lòng nhập mật khẩu",
        });

        return false;
      } else {
        setPasswordInput({ ...passwordInput, errorMessage: "" });
        return true;
      }
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

  const handleChangePassword = (event) => {
    setPasswordInput({ ...passwordInput, value: event.target.value });
  };

  const handleClickShowPassword = () =>
    setPasswordInput({ ...passwordInput, isShow: !passwordInput.isShow });

  //behaviors for re-password
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
  const handleChangeRePassword = (event) => {
    setRePasswordInput({ ...rePasswordInput, value: event.target.value });
  };
  const handleClickShowRePassword = () =>
    setRePasswordInput({ ...rePasswordInput, isShow: !rePasswordInput.isShow });

  //form behaviors
  const signUp = () => {
    let validated =
      validateEmail() &&
      validatePassword() &&
      validateRePassword() &&
      validateUsername();

    if (validated) {
      //request to create
      let user = {
        username: username.value,
        password: passwordInput.value,
        email: emailInput.value,
        gender: null,
        role_id: 1,
        properties: null,
        orders: null,
        propertiesAccessed: null,
      };
      userServices.createUser(user).then((data) => {
        if (data.constructor === String && data === "User existed") {
          setEmailInput({
            ...emailInput,
            errorMessage: "Email đã được đăng ký tài khoản",
          });
        } else if (data.constructor === Object) {
          localStorage.setItem("user", JSON.stringify(data));
          onClose();
        }
      });
    }
  };
  const signIn = () => {
    let validated = validateEmail() && validatePassword();
    if (validated) {
      let user = {
        email: emailInput.value,
        password: passwordInput.value,
      };
      userServices.login(user).then((data) => {
        if (
          data.constructor === String &&
          (data === "Wrong password" || data === "User not existed")
        ) {
          setLoginError("Mật khẩu hoặc tài khoản không đúng");
        } else if (data.constructor === Object) {
          setLoginError("");
          localStorage.setItem("user", JSON.stringify(data));
          onClose();
        }
      });
    }
  };
  const submit = () => {
    if (type === "Đăng ký") {
      signUp();
    } else signIn();
  };
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: { sm: "100%", md: "60%", lg: "40%" },
          maxHeight: 600,
        },
      }}
      maxWidth="md"
      open={open}
      fullWidth={true}
    >
      <DialogTitle>{type}</DialogTitle>
      <IconButton
        onClick={onClose}
        aria-label="close"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          padding: "32px 52px",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Box>
            <InputLabel
              error={emailInput.errorMessage !== ""}
              required
              htmlFor="email"
            >
              Địa chỉ email:
            </InputLabel>
            <OutlinedInput
              value={emailInput.value}
              onChange={handleChangeEmail}
              onBlur={validateEmail}
              fullWidth
              required
              id="email"
              type="text"
              error={emailInput.errorMessage !== ""}
            />
            {emailInput.errorMessage !== "" && (
              <FormHelperText error id="component-error-text">
                {emailInput.errorMessage}
              </FormHelperText>
            )}
          </Box>
          {type === "Đăng ký" ? (
            <Box>
              <InputLabel
                required
                htmlFor="username"
                error={username.errorMessage !== ""}
              >
                Username:
              </InputLabel>
              <OutlinedInput
                value={username.value}
                onChange={(event) => {
                  setUsername({ ...username, value: event.target.value });
                }}
                onBlur={validateUsername}
                fullWidth
                required
                id="username"
                type="text"
                error={username.errorMessage !== ""}
              />
              <FormHelperText error={username.errorMessage !== ""}>
                Dùng để hiển thị khi bạn tương tác
                {username.errorMessage !== "" ? ". Vui lòng nhập username" : ""}
              </FormHelperText>
            </Box>
          ) : null}

          <Box>
            <InputLabel
              required
              htmlFor="password"
              error={passwordInput.errorMessage !== ""}
            >
              Mật khẩu:
            </InputLabel>
            <OutlinedInput
              value={passwordInput.value}
              onChange={handleChangePassword}
              onBlur={validatePassword}
              error={passwordInput.errorMessage !== ""}
              fullWidth
              required
              id="password"
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
                    {passwordInput.isShow ? <VisibilityOff /> : <Visibility />}
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
          {type === "Đăng ký" ? (
            <Box>
              <InputLabel
                required
                htmlFor="re-password"
                error={rePasswordInput.errorMessage !== ""}
              >
                Nhập lại mật khẩu:
              </InputLabel>
              <OutlinedInput
                value={rePasswordInput.value}
                onChange={handleChangeRePassword}
                onBlur={validateRePassword}
                fullWidth
                required
                id="re-password"
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
              {!rePasswordInput.errorMessage !== "" && (
                <FormHelperText error id="component-error-text">
                  {rePasswordInput.errorMessage}
                </FormHelperText>
              )}
            </Box>
          ) : null}

          {loginError !== "" ? (
            <Box sx={{ color: "red", fontStyle: "italic" }}>{loginError}</Box>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: "12px 24px" }}>
        <Button variant="contained" disableElevation onClick={submit}>
          {type} ngay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthenDialog;
