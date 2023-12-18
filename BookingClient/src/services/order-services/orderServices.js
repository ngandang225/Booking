const apiUrl = process.env.REACT_APP_API_URL + "/Order";

const createOrder = async (order) => {
  let error=null;
  const data = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      } else {
        return res;
      }
    })
    .then((data) => data)
    .catch(err=>{ error=err;});
  return {data:data,error:error};
};
export const orderServices = { createOrder };
