import { useQuery } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL + "/GeographycalPlace";

const getAllGeographycalPlace = async () => {
  const data = await fetch(apiUrl + "/all")
    .then((response) => response.json())
    .then((data) => data);
  return data;
};
const useAllGeographycalPlace =()=>{
  const geographycalPlaces = useQuery({
    queryKey: ['geographycals'],
    queryFn: getAllGeographycalPlace,
  })
  return geographycalPlaces;
}
export const geographycalPlaceService = {getAllGeographycalPlace,useAllGeographycalPlace};
