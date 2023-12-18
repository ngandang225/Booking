import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { geographycalPlaceService } from "../../services/geograohycal-place-services/geographycalPlaceServices";
import "./filter.scss";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setFiltersSearch } from "../../redux/filters/filterSlice";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import dayjs from "dayjs";
function Filter() {
  const filtersSearch = useSelector(
    (state) => state.filters.filters.search,
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(dayjs(filtersSearch.CheckInDate));
  const [endDate, setEndDate] = useState(dayjs(filtersSearch.CheckOutDate));
  const [geographycals, setGeographycal] = useState([]);
  const [peopleNum, setPeopleNum] = useState(
    !filtersSearch.PeopleNum ? 1 : filtersSearch.PeopleNum
  );
  const [selectedGeographycal, setSelectedGeographycal] = useState({
    id: 0,
    name: "",
    center_location: "",
    thumbnail: "",
    properties: null,
    neighborhoods: null,
  });
  useEffect(() => {
    geographycalPlaceService.getAllGeographycalPlace().then((data) => {
      data.map((c) => {
        if (c.id == filtersSearch.Geographycal_Id) {
          setSelectedGeographycal(c);
        }
      });
      setGeographycal(data);
    });
  }, [filtersSearch]);
  const handleSearchClick = () => {
    const checkin = new Date(startDate);
    const checkout = new Date(endDate);
    const search = {
      CheckInDate:
        checkin.getMonth() +
        1 +
        "/" +
        checkin.getDate() +
        "/" +
        checkin.getFullYear(),
      CheckOutDate:
        checkout.getMonth() +
        1 +
        "/" +
        checkout.getDate() +
        "/" +
        checkout.getFullYear(),
      PeopleNum: parseInt(peopleNum),
      Geographycal_Id: selectedGeographycal.id,
    };
    dispatch(setFiltersSearch(search));
    navigate(`/${routes.listings}`);
  };
  const handleGeographycal = (geographycal) => {
    setSelectedGeographycal(geographycal);
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

  const inputStyle = {
    "& input": {
      fontWeight: "bold",
    },
    "& label": {
      color: "black",
    },
    marginRight: "5px",
  };
  const defaultProps = {
    options: geographycals,
    getOptionLabel: (option) => option.name,
  };

  return (
    <div className="filter">
      <Stack
        spacing={1}
        sx={{
          display: "flex",
          flex: 1,
          padding: 0,
          marginRight: "5px",
          minWidth: "250px",
        }}
      >
        <Autocomplete
          {...defaultProps}
          id="clear-on-escape"
          clearOnEscape
          value={selectedGeographycal}
          onChange={(e, value) => {
            handleGeographycal(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nơi bạn muốn đến"
              variant="filled"
              size="small"
            />
          )}
          sx={inputStyle}
        />
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Ngày nhận phòng"
          slotProps={{ textField: { variant: "filled", size: "small" } }}
          sx={inputStyle}
          renderInput={(params) => <TextField placeholder="DD/MM/YYYY" />}
          disablePast
          value={startDate}
          format="DD/MM/YYYY"
          onChange={handleStartDate}
        />
        <DatePicker
          label="Ngày trả phòng"
          slotProps={{ textField: { variant: "filled", size: "small" } }}
          sx={inputStyle}
          renderInput={(params) => <TextField placeholder="DD/MM/YYYY" />}
          value={endDate}
          format="DD/MM/YYYY"
          onChange={handleEndDate}
          minDate={startDate && startDate.add(1, "day")}
        />
      </LocalizationProvider>

      <TextField
        id="filled-number"
        label="Số lượng phòng"
        type="number"
        variant="filled"
        size="small"
        sx={inputStyle}
        value={peopleNum}
        onChange={(e) => {
          setPeopleNum(e.target.value);
        }}
        inputProps={{
          min: 1,
        }}
      />

      <Button
        sx={{
          bgcolor: "primary.main", // theme.palette.primary.main
          color: "white",
          ":hover": {
            color: "white",
          },
        }}
        onClick={() => {
          handleSearchClick();
        }}
        variant="contained"
        disableElevation
      >
        Tìm kiếm
      </Button>
    </div>
  );
}

export default Filter;
