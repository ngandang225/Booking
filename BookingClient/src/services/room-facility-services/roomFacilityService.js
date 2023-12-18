import { useQuery } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL + "/RoomFacility";

const getAllRoomFacility = async () => {
  const data = await fetch(apiUrl + "/all")
    .then((response) => response.json())
    .then((data) => data);
  return data;
};
const useAllRoomFacilities= ()=>{
  const facilities= useQuery({queryKey:["roomFacilities"],queryFn:getAllRoomFacility});
  return facilities
}
export const roomFacilityServices ={getAllRoomFacility,useAllRoomFacilities};
