const apiUrl = process.env.REACT_APP_API_URL+'/PropertyFacility';

const getAllPropertyFacility = async () =>{
    const data = await fetch(apiUrl)
                    .then(response => response.json())
                    .then(json => json);
    return data;
}   

export const propertyFacilityServices ={getAllPropertyFacility}