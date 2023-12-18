import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Logo from "./../../assets/Logo.png";
import LogoForPartner from "./../../assets/Logo-partner.png";
import AuthenDialog from "../../shared/authen-tenant/authen-dialog";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import Link from "@mui/material/Link";
import routes from "../../routes";
import "./header.scss";
function Header({ type }) {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem("user", null);
    setUser(null);
    handleCloseMenu();
  };

  const closeAuthen = () => {
    setOpenSignUp(false);
    setOpenSignIn(false);
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  };

  const menuTenant = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Thông tin cá nhân
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    );
  };

  const menuPartner = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Thông tin cá nhân</MenuItem>
        <Divider variant="middle" />
        <MenuItem onClick={handleCloseMenu}>Danh sách chỗ nghỉ</MenuItem>
        <Divider variant="middle" />
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    );
  };
  return (
    <div>
      <AuthenDialog
        open={openSignUp || openSignIn}
        type={openSignUp ? "Đăng ký" : "Đăng nhập"}
        onClose={closeAuthen}
      />
      <AppBar
        sx={{
          height: type === "tenant" ? "100px" : "60px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        className="header"
        position={type === "tenant" ? "static" : "fixed"}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            justifyContent: "space-between",
            padding: {
              lg: type === "tenant" ? "0px 150px" : "0px 24px",
              xs: "0px 24px",
            },
          }}
        >
          {/* left section */}
          <div className="section">
            <Link href={routes.home}>
              <img
                component="img"
                className={type === "tenant" ? "logo" : "logo-partner"}
                src={type === "tenant" ? Logo : LogoForPartner}
                alt="logo"
              />
            </Link>

            {type === "tenant" && (
              <Button color="inherit" variant="text">
                Nơi ở
              </Button>
            )}
            {type === "tenant" && (
              <Button color="inherit" variant="text">
                Danh lam thắng cảnh
              </Button>
            )}
          </div>
          {/* right section */}
          {user == null ? (
            <div className="section">
              {type === "tenant" && (
                <Button
                  sx={{
                    bgcolor: "white", // theme.palette.primary.main
                    color: "primary.main",
                    ":hover": {
                      color: "white",
                    },
                  }}
                  variant="contained"
                  disableElevation
                  onClick={() => setOpenSignUp(true)}
                >
                  Đăng ký
                </Button>
              )}
              <Button
                sx={{
                  bgcolor: "white", // theme.palette.primary.main
                  color: "primary.main",
                  ":hover": {
                    color: "white",
                  },
                }}
                variant="contained"
                disableElevation
                onClick={() => setOpenSignIn(true)}
              >
                Đăng nhập
              </Button>
            </div>
          ) : (
            <div>
              {type === "tenant" && (
                <Link
                  color="inherit"
                  underline="hover"
                  href={
                    user.role_Id === 2
                      ? `/` + routes.landlordSignUp
                      : routes.properties
                  }
                >
                  Chỗ nghỉ của bạn
                </Link>
              )}
              <Button
                color="inherit"
                size="small"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ textTransform: "none", ml: 1 }}
                onClick={handleOpenMenu}
              >
                <Avatar
                  children={`${user?.username?.split(" ")[0][0]}`}
                  sx={{
                    mr: 1,
                    width: 32,
                    height: 32,
                    textTransform: "capitalize",
                  }}
                />
                {user.username}
              </Button>
              {type === "tenant" ? menuTenant() : menuPartner()}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;
