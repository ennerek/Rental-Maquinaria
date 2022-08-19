const axios = require('axios').default;
const uri = process.env.REACT_APP_API_URL + "/auth";


const login = async (user) => {

    try {
        const response = await axios.post(uri + '/login', user);
        return response.data;

      
    } catch (error) {
        throw new Error(error);
    }
}

const register = async(user) => {

    try {
        const response = await axios.post(uri + '/register', user);
        return response.data;

      
    } catch (error) {
        throw new Error(error);
    }
}

const googleSignIn = async(id_token) => {

    try {
        const response = await axios.post(uri + '/googleSignIn', {id_token});

        return response.data;

      
    } catch (error) {
        throw new Error(error);
    }
}


const verifyAccount = async (userId,code) => {
    try {
        const response = await axios.put(uri + `/verifyAccount/${userId}`, {code});
        return response.data;
        

      
    } catch (error) {
        throw new Error(error);
    }
}




export { login, register, googleSignIn , verifyAccount};

