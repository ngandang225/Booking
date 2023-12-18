import el from "date-fns/locale/el";

const apiUrl = process.env.REACT_APP_API_URL + "/User";

const getAllUser = async () => {
  const data = await fetch(apiUrl + "/all")
    .then((response) => response.json())
    .then((data) => data);
  return data;
};

const createUser = async (user) => {
  const data = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
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

const login = async (user) => {
  const data = await fetch(apiUrl + "/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
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

const updateUser = async (user) => {
  const data = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
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

const changePassword = async (user) => {
  const data = await fetch(apiUrl + "/ChangePassword", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
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
}

export const userServices = { createUser, login, getAllUser, updateUser, changePassword };
