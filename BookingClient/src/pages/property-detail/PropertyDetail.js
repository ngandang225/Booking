import * as React from "react";
import { Alert, Snackbar } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppsIcon from "@mui/icons-material/Apps";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import PropertyListItem from "../property-listing/list-item/ListItem";
import Grid from "@mui/material/Grid";
import RoomDetail from "./room-detail/RoomDetail";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import routes from "../../routes";

import { propertyServices } from "../../services/property-services/propertyService";
import { propertyTypeServices } from "../../services/property-type-services/propertyTypeService";
import { reviewServices } from "../../services/review-services/reviewServices";
import { userServices } from "../../services/userServices";
import priceFormat from "../../services/priceFormat";
import "./PropertyDetail.scss";

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
function handleClick(event) {
  event.preventDefault();
}

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function changeNumberOfFloorToArray(number) {
  var floorsArray = [];
  for (var i = 0; i < number; i++) {
    floorsArray[i] = i + 1;
  }
  return floorsArray;
}

function transformIconName(icon) {
  return icon.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

function CountNumberOfFloors(rooms) {
  const uniqueFloors = new Set();
  if (rooms) {
    rooms.forEach((room) => {
      uniqueFloors.add(room.floor);
    });
  }
  return uniqueFloors.size;
}

// Handle avatar background color
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

const propertyId = 1;

function PropertyDetail() {
  const [openRoomDetail, setOpenRoomDetail] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [selectedRooms, setSelectedRooms] = React.useState({});
  const [property, setProperty] = React.useState({});
  const [images, setImages] = React.useState([]);
  const [propertyTypes, setPropertyTypes] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [roomIds, setRoomIds] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [displayedReviews, setDisplayedReviews] = React.useState(6);
  const search = useSelector((state) => state.filters.filters.search);
  const [openError, setOpenError] = React.useState(false);
  const navigate = useNavigate();
  const cacheProperty = propertyServices.usePropertyById(propertyId, search);
  React.useEffect(() => {
    propertyServices.getPropertyById(propertyId, search).then((data) => {
      setProperty(data);
      // Images
      const imageLinks = data.images.map((item, index) => {
        if (index === 0)
          return {
            img: item,
            title: data.name,
            rows: 2,
            cols: 2,
          };
        else
          return {
            img: item,
            title: data.name,
          };
      });
      setImages(imageLinks);
      // Rooms ID
      const roomIdArray = data.rooms.map((room) => room.id);
      setRoomIds(roomIdArray);

      // Fetch property types
      propertyTypeServices
        .getAllPropertyType()
        .then((data) => setPropertyTypes(data));

      // Fetch users
      userServices.getAllUser().then((data) => setUsers(data));
    });
  }, []);

  React.useEffect(() => {
    const fetchReviews = async () => {
      const roomsData = await Promise.all(
        roomIds.map((id) => reviewServices.getReview(id))
      );
      const reviewsData = roomsData.reduce((result, roomData) => {
        return result.concat(roomData);
      }, []);
      setReviews(reviewsData);
    };

    if (roomIds && roomIds.length > 0) {
      fetchReviews();
    }
  }, [roomIds]);

  const handleOpenRoom = (room, e) => {
    if (e.target !== e.currentTarget) return;
    setOpenRoomDetail(true);
    setSelectedRoom(room);
  };

  const closeAndSelect = () => {
    setOpenRoomDetail(false);
    handleCheckboxChange(selectedRoom.id);
  };
  const handleCloseRoom = () => {
    setOpenRoomDetail(false);
    setSelectedRoom(null);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    if (date >= endDate) {
      setEndDate(null);
    }
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRooms({
      ...selectedRooms,
      [id]: !selectedRooms[id],
    });
  };

  const calculateNumberOfDays = () => {
    var days;
    if (!startDate || !endDate) {
      days = 0;
    } else {
      days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    return days;
  };

  const list = [
    {
      id: 1,
      name: "Khách sạnnnnnnnnnnnnnnnnn 1",
      distanceFromCenter: 5,
      reviewRate: 4.8,
      numberOfNight: 1,
      numberOfVisitor: 2,
      priceEachNight: 500000,
      images: [
        "https://chefjob.vn/wp-content/uploads/2020/04/homestay-duoc-nhieu-du-khach-lua-chon.jpg",
      ],
    },
    {
      id: 2,
      name: "Khách sạn 2",
      distanceFromCenter: 3,
      reviewRate: 5,
      numberOfNight: 1,
      numberOfVisitor: 2,
      priceEachNight: 500000,
      images: [
        "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg",
      ],
    },
    {
      id: 3,
      name: "Khách sạn 3",
      distanceFromCenter: 4,
      reviewRate: 4.6,
      numberOfNight: 1,
      numberOfVisitor: 4,
      priceEachNight: 1000000,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWxzfGVufDB8fDB8fHww&w=1000&q=80",
      ],
    },
    {
      id: 4,
      name: "Khách sạn 4",
      distanceFromCenter: 2,
      reviewRate: 3.4,
      numberOfNight: 2,
      numberOfVisitor: 2,
      priceEachNight: 500000,
      images: [
        "https://image-tc.galaxy.tf/wijpeg-6rc902e9t312jljywldrat8xl/york-pool-dusk-ok.jpg",
      ],
    },
    {
      id: 5,
      name: "Khách sạn 5",
      distanceFromCenter: 5,
      reviewRate: 4.8,
      numberOfNight: 1,
      numberOfVisitor: 2,
      priceEachNight: 500000,
      images: [
        "https://economictimes.indiatimes.com/thumb/msid-73023854,width-1200,height-900,resizemode-4,imgsize-235513/hotel-agencies.jpg?from=mdr",
      ],
    },
  ];

  const floorsArray = changeNumberOfFloorToArray(
    CountNumberOfFloors(property.rooms)
  );

  const descriptions = property.description && JSON.parse(property.description);
  const policies = property.policy && JSON.parse(property.policy);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Lâm Đồng
    </Link>,
    <Link
      underline="hover"
      key="3"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Đà Lạt
    </Link>,
    <Typography
      key="4"
      color="text.primary"
      fontSize="0.875rem"
      fontWeight="500"
      fontFamily="'Quicksand','Roboto',sans-serif"
    >
      {property.name}
    </Typography>,
  ];

  const linkStyle = {
    paddingRight: "0",
    color: "black",
    textDecorationColor: "black",
    fontWeight: "600",
    cursor: "pointer",
  };

  const WhiteButton = styled(Button)({
    fontSize: "0.875rem",
    backgroundColor: "white",
    color: "black",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.05), 0px 1px 5px 0px rgba(0,0,0,0.05)",
    ":hover": { color: "white" },
  });

  const descriptionIconsStyle = {
    fontSize: "1.125rem",
    marginTop: "1.5px",
  };

  const selectedRoomIds = Object.keys(selectedRooms).filter(
    (roomId) => selectedRooms[roomId]
  );

  const totalPrice = selectedRoomIds.reduce((total, roomId) => {
    const selectedRoom = property.rooms.find(
      (room) => room.id === parseInt(roomId, 10)
    );
    const roomPrice = selectedRoom.price * calculateNumberOfDays();
    return total + roomPrice;
  }, 0);

  const totalReviewScore =
    property.rooms &&
    reviews.reduce((total, review) => {
      return total + review.score;
    }, 0);

  const reviewScore =
    totalReviewScore &&
    Math.round((totalReviewScore / reviews.length) * 10) / 10;

  const propertyType = propertyTypes.find((type) => {
    return type.id === property.type_Id;
  });

  // Handle see review
  const handleSeeMore = () => {
    setDisplayedReviews(reviews.length);
  };

  const handleSeeLess = () => {
    setDisplayedReviews(6);
  };
  const handleCloseAlert = () => {
    setOpenError(false);
  };
  const handleCheckout = () => {
    let user = localStorage.getItem("user");
    if (user == "null") {
      setOpenError(true);
    } else {
      const passProperty = {
        name: property.name,
        score: reviewScore,
        address: property.address,
      };
      let chosenRooms = [...property.rooms];
      chosenRooms = chosenRooms.filter((r) =>
        selectedRoomIds.includes(String(r.id))
      );
      chosenRooms = chosenRooms.map((r) => ({
        thumbnail: r.images[0],
        price: r.price,
        single_Bed: r.single_Bed,
        double_Bed: r.double_Bed,
        area: r.area,
        name: r.name,
        floor: r.floor,
        id: r.id,
      }));
      const orderStartDate =
        startDate.year() +
        "-" +
        (startDate.month() + 1) +
        "-" +
        (startDate.date() + 1);
      const orderEndDate =
        endDate.year() +
        "-" +
        (endDate.month() + 1) +
        "-" +
        (endDate.date() + 1);
      const passProps = {
        property: passProperty,
        selectedRooms: chosenRooms,
        bookInfor: {
          startDate: dayjs.tz(orderStartDate, "YYYY-MM-DD", "Asia/Saigon"),
          endDate: dayjs.tz(orderEndDate, "YYYY-MM-DD", "Asia/Saigon"),
          peopleNum: search.PeopleNum,
          roomNum: chosenRooms.length,
          dateNum: calculateNumberOfDays(),
        },
        priceInfor: {
          total: totalPrice,
          voucher: 0,
        },
      };
      navigate(routes.checkout, {
        state: { infor: JSON.stringify(passProps) },
      });
    }
  };
  return (
    <div id="property-detail-wrapper">
      {cacheProperty?.isPending && cacheProperty?.isFetching && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {cacheProperty?.isSuccess == true && (
        <>
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
              Bạn cần đăng nhập để tiến hành đặt phòng
            </Alert>
          </Snackbar>
          {/* Breadcrumbs */}
          <Stack spacing={2}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              fontSize="0.875rem"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>

          {/* General information */}
          <div id="general-info">
            <Typography variant="h3" className="name">
              {property.name}
            </Typography>
            <div className="info">
              <ul className="listing">
                <li className="rate">
                  <StarIcon sx={{ fontSize: "1.125rem" }} />
                  <Typography variant="body1">{reviewScore}</Typography>
                </li>
                <li className="comment">
                  <Typography variant="body1">
                    <Link to="#" sx={linkStyle}>
                      {reviews.length} bình luận
                    </Link>
                  </Typography>
                </li>
                <li className="type">
                  <Typography variant="body1">
                    {propertyType && propertyType.name}
                  </Typography>
                </li>
                <li className="address">
                  <Typography variant="body1">
                    <Link to="#" sx={linkStyle}>
                      {property.address}
                    </Link>
                  </Typography>
                </li>
              </ul>
              <div className="share">
                <Stack direction="row" spacing={1} height="36px">
                  <WhiteButton variant="contained" startIcon={<ShareIcon />}>
                    Chia sẻ
                  </WhiteButton>
                  <WhiteButton
                    variant="contained"
                    startIcon={<FavoriteBorderIcon />}
                  >
                    Yêu thích
                  </WhiteButton>
                </Stack>
              </div>
            </div>
          </div>

          {/* Image list */}
          <div id="img-list-container">
            <ImageList
              sx={{ borderRadius: "10px", margin: 0 }}
              variant="quilted"
              cols={4}
              rowHeight={190}
              className="img-list"
              gap={8}
            >
              {images.length > 0 &&
                images.map((item) => (
                  <ImageListItem
                    key={item.img}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                  >
                    <img
                      {...srcset(item.img, 190, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
            </ImageList>

            <WhiteButton
              variant="contained"
              startIcon={<AppsIcon />}
              className="show-all-img-btn"
            >
              Xem tất cả ảnh
            </WhiteButton>
          </div>

          {/* Description */}
          <div id="property-description">
            <div className="general">
              <Typography variant="h4" sx={{ marginBottom: "16px" }}>
                {property.name}
              </Typography>
              {descriptions &&
                descriptions.map((des, index) => (
                  <div key={index}>
                    <Typography variant="body1">{des}</Typography>
                    <br></br>
                  </div>
                ))}
            </div>

            <div className="special">
              <Typography variant="h5">Điểm nổi bật của chỗ nghỉ</Typography>
              {/* Check if reviewScore >= 4.8 to display */}
              {reviewScore >= 4.8 && (
                <div className="special-choose">
                  <Typography variant="h6">
                    Hoàn hảo cho kỳ nghỉ 1 đêm!
                  </Typography>
                  <div className="special-choose-item">
                    <LocationOnIcon sx={descriptionIconsStyle} />
                    <Typography variant="body1">
                      Địa điểm hàng đầu: Được khách gần đây đánh giá cao (
                      {reviewScore}/5)
                    </Typography>
                  </div>
                </div>
              )}

              <div className="special-view">
                {property.facilities &&
                  property.facilities.find(
                    (facility) => facility.type === "View"
                  ) && (
                    <Typography variant="h6">
                      {propertyType && propertyType.name} có:
                    </Typography>
                  )}
                {/* Display facilities with type = View */}
                {property.facilities &&
                  property.facilities
                    .filter((facility) => facility.type === "View")
                    .map((facility, index) => (
                      <Stack
                        direction="row"
                        className="special-view-item"
                        key={index}
                      >
                        <Icon>{transformIconName(facility.icon)}</Icon>
                        <Typography variant="body1">{facility.name}</Typography>
                      </Stack>
                    ))}

                {property.facilities &&
                  property.facilities.find(
                    (facility) => facility.name === "Đỗ xe miễn phí"
                  ) && (
                    <div className="special-view-item">
                      <LocalParkingIcon sx={{ fontSize: "1.125rem" }} />
                      <Typography variant="body1">
                        Có bãi đậu xe riêng miễn phí ở{" "}
                        {propertyType && propertyType.name.toLowerCase()} này
                      </Typography>
                    </div>
                  )}
              </div>

              <Button
                href="#room-booking"
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  boxShadow: "none",
                  width: "100%",
                  marginLeft: 0,
                }}
              >
                Đặt ngay
              </Button>
            </div>
          </div>

          {!!openRoomDetail && (
            <RoomDetail
              handleSelect={closeAndSelect}
              handleClose={handleCloseRoom}
              room={selectedRoom}
            ></RoomDetail>
          )}
          {/* Room booking */}
          <div id="room-booking">
            <Typography variant="h4">Chọn phòng ở</Typography>
            <div className="body">
              {/* Show room number */}
              <div className="room-showing">
                {floorsArray.map((floor, index) => (
                  <div key={index} className="room-floor">
                    <Typography
                      variant="h6"
                      key={index}
                    >{`Tầng ${floor}`}</Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableBody>
                          <TableRow sx={{ "td, th": { border: 0 } }}>
                            {/* Display maximum 5 rooms on 1 row */}
                            {property.rooms
                              .filter((room) => room.floor === floor)
                              .slice(0, 5)
                              .map((roomEachFloor) => (
                                <TableCell
                                  key={roomEachFloor.id}
                                  className={
                                    roomEachFloor.isAvailable == true
                                      ? "room-cell"
                                      : "disable-cell"
                                  }
                                  onClick={(event) => {
                                    handleOpenRoom(roomEachFloor, event);
                                  }}
                                >
                                  <Checkbox
                                    disabled={
                                      roomEachFloor.isAvailable == true
                                        ? false
                                        : true
                                    }
                                    checked={
                                      selectedRooms[roomEachFloor.id] || false
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(roomEachFloor.id)
                                    }
                                  />
                                  Phòng {roomEachFloor.room_Number}
                                </TableCell>
                              ))}
                          </TableRow>
                          <TableRow sx={{ "td, th": { border: 0 } }}>
                            {property.rooms
                              .filter((room) => room.floor === floor)
                              .slice(5)
                              .map((roomEachFloor) => (
                                <TableCell
                                  key={roomEachFloor.id}
                                  className={
                                    roomEachFloor.isAvailable == true
                                      ? "room-cell"
                                      : "disable-cell"
                                  }
                                  onClick={(event) => {
                                    handleOpenRoom(roomEachFloor, event);
                                  }}
                                >
                                  <Checkbox
                                    disabled={
                                      roomEachFloor.isAvailable == true
                                        ? false
                                        : true
                                    }
                                    checked={
                                      selectedRooms[roomEachFloor.id] || false
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(roomEachFloor.id)
                                    }
                                  />
                                  Phòng {roomEachFloor.room_Number}
                                </TableCell>
                              ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ))}
              </div>

              {/* Checkout table */}
              <div className="room-checkout">
                <TableContainer component={Paper}>
                  <Table sx={{ boxShadow: "none" }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell className="start-date">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Ngày nhận phòng"
                              slotProps={{
                                textField: {
                                  variant: "filled",
                                  size: "small",
                                  placeholder: "DD/MM/YYYY",
                                },
                              }}
                              sx={{ "& label": { color: "black" } }}
                              disablePast
                              value={startDate}
                              format="DD/MM/YYYY"
                              onChange={handleStartDate}
                            />
                          </LocalizationProvider>
                        </TableCell>
                        <TableCell
                          className="end-date"
                          style={{ width: "50%" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Ngày trả phòng"
                              slotProps={{
                                textField: {
                                  variant: "filled",
                                  size: "small",
                                  placeholder: "DD/MM/YYYY",
                                },
                              }}
                              sx={{ "& label": { color: "black" } }}
                              value={endDate}
                              format="DD/MM/YYYY"
                              onChange={handleEndDate}
                              minDate={startDate && startDate.add(1, "day")}
                            />
                          </LocalizationProvider>
                        </TableCell>
                      </TableRow>
                      {/* For each selected room, display it to checkout table */}
                      {Object.keys(selectedRooms)
                        .filter((roomId) => selectedRooms[roomId])
                        .map((roomId) => {
                          const selectedRoom = property.rooms.find(
                            (room) => room.id === parseInt(roomId, 10)
                          );
                          return (
                            <TableRow key={selectedRoom.id}>
                              <TableCell className="room-number">
                                Phòng {selectedRoom.room_Number}
                              </TableCell>
                              <TableCell
                                style={{ textAlign: "right", paddingLeft: 0 }}
                              >
                                <span className="unit-price">{`VND ${priceFormat(
                                  selectedRoom.price
                                )}`}</span>
                                <div className="price">
                                  <span className="quantity">
                                    x {calculateNumberOfDays()} đêm
                                  </span>
                                  <span className="price-per-room">
                                    {`VND ${priceFormat(
                                      selectedRoom.price *
                                        calculateNumberOfDays()
                                    )}`}
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      <TableRow sx={{ "td, th": { border: 0 } }}>
                        <TableCell style={{ fontSize: "1.25rem" }}>
                          Tổng
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "right", paddingLeft: 0 }}
                        >
                          <span className="total-price">{`VND ${priceFormat(
                            totalPrice
                          )}`}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "td, th": { border: 0 } }}>
                        <TableCell colSpan={2} className="booking-btn">
                          <Button
                            onClick={() => {
                              handleCheckout();
                            }}
                            variant="contained"
                            sx={{
                              backgroundColor: "primary.main",
                              boxShadow: "none",
                              width: "100%",
                              height: "60px",
                              fontSize: "1.25rem",
                              marginLeft: 0,
                            }}
                          >
                            Đặt phòng
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>

          {/* Review */}
          <div id="reviews">
            <Typography variant="h4">Đánh giá của khách</Typography>
            <div className="rate-reviews-number">
              <div className="point">
                <StarIcon sx={{ fontSize: "1.125rem", marginTop: "4px" }} />
                <Typography variant="h6">{reviewScore}</Typography>
              </div>
              <Typography variant="h6">{reviews.length} bình luận</Typography>
            </div>
            <div className="reviews-body">
              {reviews.slice(0, displayedReviews).map((review, index) => {
                const user = users.find((user) => user.id === review.user_Id);
                return (
                  <div className="reviews-item" key={index}>
                    <div className="tenant-info">
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            alt={user.name}
                            {...stringAvatar(user.username.toUpperCase())}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.username}
                          secondary={user.email}
                        />
                      </ListItem>
                    </div>
                    <div className="point-date">
                      <div className="star">
                        {/* The number of displayed stars depend on review.score */}
                        {Array.from({ length: review.score }).map(
                          (_, index) => (
                            <StarIcon
                              key={index}
                              color="primary"
                              sx={{ fontSize: "0.75rem" }}
                            />
                          )
                        )}
                      </div>
                      <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
                        {review.createdAt.replace("T", " ")}
                      </Typography>
                    </div>
                    <Typography variant="body1" sx={{ marginTop: "4px" }}>
                      {review.content}
                    </Typography>
                  </div>
                );
              })}
            </div>
            <div className="reviews-button">
              {displayedReviews < reviews.length ? (
                <WhiteButton
                  variant="contained"
                  sx={{ color: "primary.main", width: "20%" }}
                  onClick={handleSeeMore}
                >
                  Xem thêm bình luận
                </WhiteButton>
              ) : (
                <WhiteButton
                  variant="contained"
                  sx={{ color: "primary.main", width: "20%" }}
                  onClick={handleSeeLess}
                >
                  Thu gọn bình luận
                </WhiteButton>
              )}
              <Button
                href="#room-booking"
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  boxShadow: "none",
                  width: "20%",
                }}
              >
                Xem phòng trống
              </Button>
            </div>
          </div>

          {/* Amenity */}
          <div id="amenity">
            <Typography variant="h4">
              Các tiện nghi của {property.name}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {property.facilities &&
                    property.facilities
                      .filter((facility) => facility.type === "Amenity")
                      .reduce((rows, facility, index) => {
                        if (index % 2 === 0) {
                          // Create a new row for every even-indexed facility
                          rows.push([facility]);
                        } else {
                          // Add the facility to the last row
                          rows[rows.length - 1].push(facility);
                        }
                        return rows;
                      }, [])
                      .map((row, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          sx={{ "td, th": { border: 0 } }}
                        >
                          {row.map((facility, facilityIndex) => (
                            <TableCell
                              key={facilityIndex}
                              sx={{ paddingLeft: 0, paddingBottom: 0 }}
                            >
                              <Stack direction="row">
                                <Icon>{transformIconName(facility.icon)}</Icon>
                                <Typography variant="body1">
                                  {facility.name}
                                </Typography>
                              </Stack>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* Policy */}
          <div id="policy">
            <Typography variant="h4" sx={{ marginBottom: "16px" }}>
              Quy tắc chung
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableBody>
                  {policies &&
                    policies.map((policy, index) => (
                      <TableRow key={index}>
                        <TableCell>{JSON.parse(policy).name}</TableCell>
                        <TableCell>{JSON.parse(policy).value}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* Recommend */}
          <div id="recommend">
            <Typography variant="h4" sx={{ marginBottom: "16px" }}>
              Đề xuất chỗ nghỉ
            </Typography>
            <div className="scroll-list">
              <div className="property-list">
                {list.map((listItem, index) => (
                  <PropertyListItem property={listItem} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default PropertyDetail;
