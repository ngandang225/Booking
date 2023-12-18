import "./PropertyListing.scss";
import Filter from "../../shared/filter/filter";
import FilterDialog from "../../shared/filter-dialog/FilterDialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Box, Pagination, CircularProgress } from "@mui/material";
import ListItem from "./list-item/ListItem";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  setFiltersPagination,
  setFiltersSort,
  resetFilters,
} from "../../redux/filters/filterSlice";
import { propertyServices } from "../../services/property-services/propertyService";
import { QueryClient } from "@tanstack/react-query";
function PropertyListing() {
  const filter = useSelector((state) => state.filters.filters, shallowEqual);
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const properites = propertyServices.useProperties(filter);
  const [sortCondition, setSortCondition] = React.useState(
    !filter.sort?.SortBy ? "toppick" : filter.sort?.SortBy
  );
  const handleChangeSort = (event) => {
    setSortCondition(event.target.value);
    dispatch(setFiltersSort(event.target.value));
  };
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
    dispatch(setFiltersPagination({ PageIndex: value, PageSize: 20 }));
  };
  React.useEffect(() => {
    queryClient.invalidateQueries();
  }, [filter]);
  return (
    <div className="listing">
      <Filter />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          mb: 2,
        }}
      >
        <FormControl
          sx={{
            minWidth: 200,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
          size="small"
        >
          <label htmlFor="sortSelect">Sắp xếp theo:</label>
          <Select
            id="sortSelect"
            autoWidth
            size="small"
            value={sortCondition}
            onChange={handleChangeSort}
          >
            <MenuItem value="toppick">Lựa chọn hàng đầu</MenuItem>
            <MenuItem value="priceAsc">Giá thấp nhất</MenuItem>
            <MenuItem value="priceDesc">Giá cao nhất</MenuItem>
            <MenuItem value="ratingDesc">Đánh giá cao nhất</MenuItem>
          </Select>
        </FormControl>
        <FilterDialog />
      </Box>
      {properites?.isPending && properites?.isFetching && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {properites?.isSuccess == true && properites?.data.length > 0 && (
        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
          {properites?.data.length > 0 &&
            properites.data.map((listItem) => (
              <Grid item xs={6} md={4} lg={3} key={listItem.id}>
                <ListItem property={listItem} />
              </Grid>
            ))}
        </Grid>
      )}
      {properites?.isSuccess == true && properites?.data.length <= 0 && (
        <div>
          <p>Hiện không có nơi nào dung thân bạn đâu, cút</p>
        </div>
      )}
      <Pagination
        count={properites?.data?.length >0 ? properites.data.length%20 :10}
        color="primary"
        page={page}
        onChange={handleChangePage}
        sx={{ width: "fit-content", marginX: "auto", mt: 2 }}
      />
    </div>
  );
}

export default PropertyListing;
