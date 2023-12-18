import { useQuery } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL + "/RoomType";

const getAllRoomType = async () => {
  const data = await fetch(apiUrl + "/all")
    .then((response) => response.json())
    .then((data) => data);
  return data;
};
const useAllRoomTypes = ()=>{
  const roomTypes= useQuery({
    queryKey:["roomTypes"],
    queryFn:getAllRoomType
  })
  return roomTypes
}
export const roomTypeServices = { getAllRoomType,useAllRoomTypes};
