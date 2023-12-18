import { useQuery } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL + "/PropertyType";

const getAllPropertyType = async () => {
  const data = await fetch(apiUrl + "/all")
    .then((response) => response.json())
    .then((data) => data);
  return data;
};
const useAllPropertyTypes = ()=>{
  const propertyTypes= useQuery({
    queryKey:["propertyTypes"],
    queryFn:getAllPropertyType
  })
  return propertyTypes
}
export const propertyTypeServices = { getAllPropertyType,useAllPropertyTypes };
