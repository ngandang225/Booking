import { useQuery } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL + "/Neighborhood";

const getAllNeighborhood = async () => {
  const data = await fetch(apiUrl + "/all")
    .then((response) => response.json())
    .then((data) => data);
  return data;
};
const useAllNeighborhood = ()=>{
  const neighborhoods = useQuery({
    queryKey: ['neighborhoods'],
    queryFn: getAllNeighborhood,
  })
  return neighborhoods
}
export const neighborhoodServices = {getAllNeighborhood,useAllNeighborhood};