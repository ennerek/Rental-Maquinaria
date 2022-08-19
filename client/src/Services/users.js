const axios = require('axios').default;
const uri = process.env.REACT_APP_API_URL + "/users";


const getUser = async (token) => {

    try {
        const response = await axios.get(uri, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;

      
    } catch (error) {
        throw new Error(error);
    }
}

const updateRolUser = async (token) => {

    try {
        const response = await axios.patch(uri, {},{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;

      
    } catch (error) {
        throw new Error(error);
    }
}










export { getUser, updateRolUser};
