import { toQueryString } from "./utils";
import { useQuery } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL + "/Property";

const getPropertyById = async (id, search) => {
  let queryString = "?" + toQueryString(search);
  const MainApiUrl = `${apiUrl}/${id}`;
  const data = await fetch(MainApiUrl + queryString)
    .then((response) => response.json())
    .then((json) => json);
  return data;
};
const getAllByUserId = async (userId) => {
  const data = await fetch(apiUrl + "/user/" + userId)
    .then((response) => response.json())
    .then((json) => json);
  return data;
};
const getProperties = async (filter) => {
  let filterQueryString = "";
  let sortQueryString = "";
  let paginationQueryString = "";
  let searchQueryString = "";
  let queryString = "";
  if (filter.filter != null) {
    filterQueryString = toQueryString(filter.filter);
  }
  if (filter.sort != null) {
    sortQueryString = toQueryString(filter.sort);
  }
  if (filter.search != null) {
    searchQueryString = toQueryString(filter.search);
  }
  if (filter.pagination != null) {
    paginationQueryString = toQueryString(filter.pagination);
  }
  if (
    filterQueryString.length > 0 ||
    sortQueryString.length > 0 ||
    searchQueryString.length > 0 ||
    paginationQueryString.length > 0
  ) {
    queryString =
      "?" +
      filterQueryString +
      "&" +
      sortQueryString +
      "&" +
      searchQueryString +
      "&" +
      paginationQueryString;
  }
  const data = await fetch(apiUrl + queryString)
    .then((response) => response.json())
    .then((data) => data);
  return data;
};
const createProperty = async (property) => {
  const data = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          // JSON response
          return response.json();
        } else if (contentType && contentType.includes("text/plain")) {
          // Plain text response
          return response.text();
        }
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
const useProperties = (filter) => {
  const properties = useQuery({
    queryKey: ["properties", { filter }],
    queryFn: ({ queryKey }) => {
      const [_key, { filter }] = queryKey;
      return getProperties(filter);
    },
  });
  return properties;
};
const usePropertyById = (id, search) => {
  const properties = useQuery({
    queryKey: ["propertyById", { id, search }],
    queryFn: ({ queryKey }) => {
      const [_key, { id, search }] = queryKey;
      return getPropertyById(id, search);
    },
  });
  return properties;
};

const getByIdWithStaffs = async (id) => {
  const data = await fetch(apiUrl + "/withStaffs/" + id)
    .then((response) => response.json())
    .then((json) => json);
  return data;
};

const deleteStaffs = async (id, staffs) => {
  const data = await fetch(apiUrl + "/staffs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staffs),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          // JSON response
          return response.json();
        } else if (contentType && contentType.includes("text/plain")) {
          // Plain text response
          return response.text();
        }
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log(error);
    });
  return data;
};

const addStaffs = async (id, userEmail) => {
  const data = await fetch(apiUrl + "/staffs/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userEmail),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response.text);
        return response.text();
      } else {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          // JSON response
          return response.json();
        } else if (contentType && contentType.includes("text/plain")) {
          // Plain text response
          return response.text();
        }
      }
    })
    .then((data) => data);
  return data;
};
export const propertyServices = {
  getProperties,
  getPropertyById,
  getAllByUserId,
  createProperty,
  useProperties,
  usePropertyById,
  getByIdWithStaffs,
  deleteStaffs,
  addStaffs,
};
