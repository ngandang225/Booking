import Carousel from "../../shared/carousel/carousel";
import Filter from "../../shared/filter/filter";
import { geographycalPlaceService } from "../../services/geograohycal-place-services/geographycalPlaceServices";
import { neighborhoodServices } from "../../services/neighborhood-services/neighborhood-services";
import { propertyTypeServices } from "../../services/property-type-services/propertyTypeService";
import * as React from "react";
import "./home.scss";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFiltersFilter,
  setFiltersSearch,
} from "../../redux/filters/filterSlice";
import routes from "../../routes";
import { CircularProgress } from "@mui/material";
const Home = () => {
  const neighborhoods = neighborhoodServices.useAllNeighborhood();
  const propertyTypes = propertyTypeServices.useAllPropertyTypes();
  const geographycalPlaces = geographycalPlaceService.useAllGeographycalPlace();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.filters);
  const handleClickGeo = (geo) => {
    if (filter?.search.Geographycal_Id != geo.id) {
      dispatch(setFiltersSearch({ ...filter.search, Geographycal_Id: geo.id }));
      navigate(routes.listings);
    } else {
      navigate(routes.listings);
    }
  };
  const handleClickNei = (nei) => {
    if (
      filter?.filter.NeighborhoodIds != null &&
      filter?.filter.NeighborhoodIds.includes(nei.id)
    ) {
      navigate(routes.listings);
    } else {
      const arr = new Array();
      arr.push(nei.id);
      dispatch(setFiltersFilter({ ...filter.filter, NeighborhoodIds: arr }));
      dispatch(
        setFiltersSearch({
          ...filter.search,
          Geographycal_Id: nei.geograhycalPlace_Id,
        })
      );
      navigate(routes.listings);
    }
  };
  const handleClickType = (type) => {
    if (
      filter?.filter.TypeIds != null &&
      filter?.filter.TypeIds.includes(type.id)
    ) {
      navigate(routes.listings);
    } else {
      const arr = new Array();
      arr.push(type.id);

      dispatch(setFiltersFilter({ ...filter.filter, TypeIds: arr }));
      navigate(routes.listings);
    }
  };
  return (
    <div className="body">
      <div className="filterComponent">
        <Filter></Filter>
        <h3 className="bodyTitle">Khám phá Việt Nam</h3>
        {geographycalPlaces?.isPending &&
          geographycalPlaces?.isFetching == true && (
            <div className="loading">
              <CircularProgress />
            </div>
          )}
        {geographycalPlaces?.isSuccess == true && (
          <Carousel
            data={geographycalPlaces?.data}
            handleClick={handleClickGeo}
          ></Carousel>
        )}
        <h3 className="bodyTitle">Địa điểm du lịch</h3>
        {neighborhoods?.isPending && neighborhoods.isFetching && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
        {neighborhoods?.isSuccess == true && (
          <Carousel
            data={neighborhoods?.data}
            handleClick={handleClickNei}
          ></Carousel>
        )}
        <h3 className="bodyTitle">Loại hình nơi ở</h3>
        {propertyTypes?.isPending && propertyTypes?.isFetching && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
        {propertyTypes?.isSuccess == true && (
          <Carousel
            data={propertyTypes?.data}
            handleClick={handleClickType}
          ></Carousel>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Home;
