const axios = require("axios").default;
const uri = process.env.REACT_APP_API_URL + "/machineries";

const getMachineries = async () => {
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const addMachinery = async (machinery, token) => {
  try {
    const response = await axios.post(uri, machinery, {
        headers: {
                'Authorization': `Bearer ${token}`
            }
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


const searchMachineries = async (name) => {
  try {
    const response = await axios.get(uri + `/${name}`.toString().trim());
    return response.data.result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMachinery = async (machineryID, token) => {
  try {
    const response = await axios.delete(uri + `/${machineryID}`, {
        headers: {
                'Authorization': `Bearer ${token}`
            }
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


export { getMachineries, addMachinery, searchMachineries, deleteMachinery };
