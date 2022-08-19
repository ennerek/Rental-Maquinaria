const axios = require('axios').default;
const uri = process.env.REACT_APP_API_URL + "/departaments";

const getDepartament = async(user) => {
    
        try {
            const response = await axios.get(uri);
            return response.data;
    
        
        } catch (error) {
            throw new Error(error);
        }
    }

    const addDepartament = async(departament) => {
        
            try {
                const response = await axios.post(uri, departament);
                return response.data;
        
            
            } catch (error) {
                throw new Error(error);
            }
        }