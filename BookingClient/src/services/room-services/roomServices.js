import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL + "/Room";
const addRoom = async (room) => {
  let error = null;
  const data = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      } else {
        return res;
      }
    })
    .then((data) => data)
    .catch((err) => {
      error = err;
    });
  return { data: data, error: error };
};
const updateRoom = async (room) => {
  let error = null;
  const data = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      } else {
        return res;
      }
    })
    .then((data) => data)
    .catch((err) => {
      error = err;
    });
  return { data: data, error: error };
};
const useAddRoom = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn:(room) =>addRoom(room),
    onSuccess:()=>{
        queryClient.invalidateQueries("propertyById");
    }
  });
  return mutation
};
const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn:(room) =>updateRoom(room),
    onSuccess:()=>{
        queryClient.invalidateQueries("propertyById");
    }
  });
  return mutation
};
export const roomServices={useAddRoom,useUpdateRoom}
