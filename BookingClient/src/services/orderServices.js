const apiUrl = process.env.REACT_APP_API_URL + '/Order';

const getOrdersByUserId = async (id) => {
    const data = await fetch(apiUrl + "/user/" + id)
        .then(response => response.json())
        .then(json => json);
    return data;
}

export const orderServices = { getOrdersByUserId };