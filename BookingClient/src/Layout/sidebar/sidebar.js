import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Link, useLocation } from "react-router-dom";
import * as React from "react";
// import "./sidebar.css";
import { Box, Typography } from "@mui/material";
const drawerWidth = 240;
const topNavs = [
  {
    title: "Trang chủ",
    icon: SpaceDashboardIcon,
    route: "/properties",
  },
  {
    title: "Quản lý chỗ nghỉ",
    icon: ApartmentIcon,
    route: "/properties/information",
  },
  {
    title: "Quản lý phòng ở",
    icon: HolidayVillageIcon,
    route: "/properties/rooms",
  },
  {
    title: "Quản lý đặt phòng",
    icon: ListAltIcon,
    route: "/properties/orders",
  },
  {
    title: "Quản lý nhân viên",
    icon: PeopleIcon,
    route: "/properties/staffs",
  },
];
const bottomNavs = [
  {
    title: "Chuyển vũ trụ",
    icon: ReadMoreIcon,
    route: "/partner/products",
  },
];

function Sidebar() {
  const [location, setLocation] = React.useState(useLocation());

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          mt: "64px",
        },
      }}
      variant="permanent"
    >
      <Box
        sx={{
          overflow: "auto",
          height: (theme) => `calc(100vh - ${theme.spacing(8)})`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List>
          {topNavs.map((item, index) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={Link}
                to={item.route}
                selected={item.route === location.pathname}
                sx={{
                  padding: "12px 20px",
                  "&.Mui-selected": {
                    color: (theme) => theme.palette.primary.dark,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      item.route === location.pathname
                        ? (theme) => theme.palette.primary.dark
                        : "",
                  }}
                >
                  {<item.icon />}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {bottomNavs.map((item, index) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={Link}
                to={item.route}
                selected={item.route === location.pathname}
                sx={{ padding: "12px 20px" }}
              >
                <ListItemIcon>{<item.icon />}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
