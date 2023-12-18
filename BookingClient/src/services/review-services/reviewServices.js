const apiUrlBase = process.env.REACT_APP_API_URL + "/Review/";

const getReview = async (id) => {
    const apiUrl = `${apiUrlBase}${id}`
    const data = await fetch(apiUrl)
        .then(response => response.json())
        .then(json => json);
    return data;
}
export const reviewServices = {getReview};