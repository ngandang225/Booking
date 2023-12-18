import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Divider, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { propertyFacilityServices } from "../../services/property-facility-services/propertyFacilityService";
import { roomFacilityServices } from "../../services/room-facility-services/roomFacilityService";
import { propertyTypeServices } from "../../services/property-type-services/propertyTypeService";
import {
  setFiltersFilter,
  resetFiltersFilter,
} from "../../redux/filters/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import "./FilterDialog.scss";
import { da } from "date-fns/locale";
const maxPrice = 2000000;
function FilterDialog(props) {
  const filter = useSelector((state) => state.filters.filters.filter);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [badgeContent, setBadgeContent] = React.useState(0);
  const [propertyTypes, setPropertyTypes] = React.useState([]);
  const [chosenTypes, setChosenTypes] = React.useState([]);
  const [roomFacilities, setRoomFacilities] = React.useState([]);
  const [chosenRoomFacilities, setChosenRoomFacilities] = React.useState([]);
  const [chosenRatings, setChosenRatings] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState(
    filter.PriceTo != null && filter.PriceFrom != null
      ? [filter.PriceFrom, filter.PriceTo]
      : [0, maxPrice]
  );
  const [propertyFacilities, setPropertyFacilities] = React.useState([]);
  const [chosenPropertyFacilities, setChosenPropertyFacilities] =
    React.useState([]);
  React.useEffect(() => {
    propertyFacilityServices.getAllPropertyFacility().then((data) => {
      var tempPropFacs = [];
      data.map((c) => {
        if (filter?.FacilityIds != null && filter.FacilityIds.includes(c.id)) {
          tempPropFacs.push(c);
        }
      });
      setChosenPropertyFacilities(tempPropFacs);
      setPropertyFacilities(data);
    });
    propertyTypeServices.getAllPropertyType().then((data) => {
      var tempTypes = [];
      data.map((c) => {
        if (filter.TypeIds?.length != null && filter.TypeIds.includes(c.id)) {
          tempTypes.push(c);
        }
      });
      setChosenTypes(tempTypes);
      setPropertyTypes(data);
    });
    roomFacilityServices.getAllRoomFacility().then((data) => {
      var tempRoomFacs = [];
      data.map((c) => {
        if (
          filter?.RoomFacilityIds != null &&
          filter.RoomFacilityIds.includes(c.id)
        ) {
          tempRoomFacs.push(c);
        }
      });
      setChosenRoomFacilities(tempRoomFacs);
      setRoomFacilities(data);
    });
    countBadge();
  }, []);
  const format = (value, index) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleChangePrice = (event, newValue) => {
    setPriceRange(newValue);
  };
  const handleToggleType = (typeToToggle) => () => {
    setChosenTypes((types) => {
      const index = types.findIndex((type) => type.id === typeToToggle.id);
      if (index > -1) {
        // If the type is already selected, remove it from the array
        types.splice(index, 1);
        return [...types];
      } else {
        // If the type is not selected, add it to the array
        return [...types, typeToToggle];
      }
    });
  };
  const handleToggleRoomFacilities = (facToToggle) => () => {
    setChosenRoomFacilities((facs) => {
      const index = facs.findIndex((type) => type.id === facToToggle.id);
      if (index > -1) {
        // If the type is already selected, remove it from the array
        facs.splice(index, 1);
        return [...facs];
      } else {
        // If the type is not selected, add it to the array
        return [...facs, facToToggle];
      }
    });
  };
  const handleTogglePropertyFacilities = (facToToggle) => () => {
    setChosenPropertyFacilities((facs) => {
      const index = facs.findIndex((type) => type.id === facToToggle.id);
      if (index > -1) {
        // If the type is already selected, remove it from the array
        facs.splice(index, 1);
        return [...facs];
      } else {
        // If the type is not selected, add it to the array
        return [...facs, facToToggle];
      }
    });
  };
  const handleToggleRating = (ratingToToggle) => () => {
    setChosenRatings((ratings) => {
      const index = ratings.findIndex((rate) => rate === ratingToToggle);
      dispatch(setFiltersFilter({ ...filter, ReviewRate: ratingToToggle }));
      if (index > -1) {
        // If the type is already selected, remove it from the array
        ratings.splice(index, 1);
        return [...ratings];
      } else {
        // If the type is not selected, add it to the array
        return [...ratings, ratingToToggle];
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const deleteAll = () => {
    setPriceRange([0, maxPrice]);
    setChosenTypes([]);
    setChosenPropertyFacilities([]);
    setChosenRoomFacilities([]);
    setChosenRatings([]);
    dispatch(resetFiltersFilter());
  };
  const countBadge = () => {
    let result = 0;
    if (priceRange[0] !== 0 || priceRange[1] !== maxPrice) {
      result++;
    }
    if (chosenPropertyFacilities.length > 0 || filter.FacilityIds?.length > 0) {
      result++;
    }
    if (chosenRoomFacilities.length > 0 || filter.RoomFacilityIds?.length > 0) {
      result++;
    }
    if (chosenTypes.length > 0 || filter.TypeIds?.length > 0) {
      result++;
    }
    if (chosenRatings.length > 0) {
      result++;
    }
    setBadgeContent(result);
  };
  const handleSave = () => {
    let filterTypes = [];
    chosenTypes.map((c) => {
      filterTypes.push(parseInt(c.id));
    });
    let filterPropFacs = [];
    chosenPropertyFacilities.map((c) => {
      filterPropFacs.push(parseInt(c.id));
    });
    let filterRoomFacs = [];
    chosenRoomFacilities.map((c) => {
      filterRoomFacs.push(parseInt(c.id));
    });
    dispatch(
      setFiltersFilter({
        ...filter,
        TypeIds: [...filterTypes],
        FacilityIds: [...filterPropFacs],
        RoomFacilityIds: [...filterRoomFacs],
        PriceTo: priceRange[1],
        PriceFrom: priceRange[0],
      })
    );
    countBadge();
    handleClose();
  };
  return (
    <div className="filter-dialog">
      <Badge badgeContent={badgeContent} color="primary">
        <Button
          startIcon={<FilterListOutlinedIcon />}
          variant="outlined"
          onClick={handleClickOpen}
          color="inherit"
          sx={{
            borderColor: (theme) => theme.palette.grey[400],
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Lọc
        </Button>
      </Badge>
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
        <DialogTitle>Bộ lọc nâng cao</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
            padding: "24px",
          }}
        >
          <Stack direction="column" divider={<Divider flexItem />} spacing={2}>
            <Stack direction="column" spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Loại chỗ ở</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    borderColor: (theme) => theme.palette.grey[500],
                    fontSize: "10px",
                  }}
                  onClick={() => {
                    setChosenTypes([...propertyTypes]);
                  }}
                >
                  Chọn tất cả
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {propertyTypes.length > 0 &&
                  propertyTypes.map((propertyType, index) => (
                    <Chip
                      key={index}
                      label={propertyType.name}
                      variant={
                        chosenTypes.some((type) => type.id === propertyType.id)
                          ? "filled"
                          : "outlined"
                      }
                      onClick={handleToggleType(propertyType)}
                      icon={
                        chosenTypes.some(
                          (type) => type.id === propertyType.id
                        ) ? (
                          <CheckOutlinedIcon fontSize="small" />
                        ) : null
                      }
                      // You can add additional props and styles here if needed
                    />
                  ))}
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Mức giá (mỗi đêm)</Typography>
                <Typography variant="subtitle1" sx={{ lineHeight: "1.75rem" }}>
                  {format(priceRange[0]) +
                    " VND - " +
                    format(priceRange[1] + " VND")}
                </Typography>
              </Box>
              <Box sx={{ width: "99%" }}>
                <Slider
                  value={priceRange}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                  max={maxPrice}
                  step={50000}
                  valueLabelFormat={format}
                />
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Tiện ích nơi ở</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    borderColor: (theme) => theme.palette.grey[500],
                    fontSize: "10px",
                  }}
                  onClick={() => {
                    setChosenPropertyFacilities([...propertyFacilities]);
                  }}
                >
                  Chọn tất cả
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {propertyFacilities.length > 0 &&
                  propertyFacilities.map((propertyFacility, index) => (
                    <Chip
                      key={index + "fac"}
                      label={propertyFacility.name}
                      variant={
                        chosenPropertyFacilities.some(
                          (fac) => fac.id === propertyFacility.id
                        )
                          ? "filled"
                          : "outlined"
                      }
                      onClick={handleTogglePropertyFacilities(propertyFacility)}
                      icon={
                        chosenPropertyFacilities.some(
                          (fac) => fac.id === propertyFacility.id
                        ) ? (
                          <CheckOutlinedIcon fontSize="small" />
                        ) : null
                      }
                      // You can add additional props and styles here if needed
                    />
                  ))}
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Tiện ích phòng</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    borderColor: (theme) => theme.palette.grey[500],
                    fontSize: "10px",
                  }}
                  onClick={() => {
                    setChosenRoomFacilities([...roomFacilities]);
                  }}
                >
                  Chọn tất cả
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {roomFacilities.length > 0 &&
                  roomFacilities.map((roomFacility, index) => (
                    <Chip
                      key={index + "fac"}
                      label={roomFacility.name}
                      variant={
                        chosenRoomFacilities.some(
                          (fac) => fac.id === roomFacility.id
                        )
                          ? "filled"
                          : "outlined"
                      }
                      onClick={handleToggleRoomFacilities(roomFacility)}
                      icon={
                        chosenRoomFacilities.some(
                          (fac) => fac.id === roomFacility.id
                        ) ? (
                          <CheckOutlinedIcon fontSize="small" />
                        ) : null
                      }
                      // You can add additional props and styles here if needed
                    />
                  ))}
              </Box>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Đánh giá của khách hàng</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    borderColor: (theme) => theme.palette.grey[500],
                    fontSize: "10px",
                  }}
                  onClick={() => {
                    setChosenRatings([1, 2, 3, 4, 5]);
                  }}
                >
                  Chọn tất cả
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {[1, 2, 3, 4, 5].map((rating, index) => (
                  <Chip
                    key={index + "rate"}
                    label={rating + " sao"}
                    variant={
                      chosenRatings.some((rate) => rate === rating)
                        ? "filled"
                        : "outlined"
                    }
                    onClick={handleToggleRating(rating)}
                    icon={
                      chosenRatings.some((rate) => rate === rating) ? (
                        <CheckOutlinedIcon fontSize="small" />
                      ) : null
                    }
                    // You can add additional props and styles here if needed
                  />
                ))}
              </Box>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "space-between", padding: "12px 24px" }}
        >
          <Button onClick={deleteAll}>Xóa tất cả</Button>
          <Button variant="contained" disableElevation onClick={handleSave}>
            Tìm kiếm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterDialog;
