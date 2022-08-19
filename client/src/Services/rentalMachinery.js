const axios = require('axios').default;
const uri = process.env.REACT_APP_API_URL + "/rentalMachinery";

const rentalMachinery = async (machineryID, dateValue, token) => {
  try {
    const response = await axios.post(uri + `/${machineryID}`, { dateValue }, {
        headers: {
                'Authorization': `Bearer ${token}`
            }
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getRentedMachineries = async (token) => {
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

const makePayment = async (machineries, total, token) => {
  try {
    const response = await axios.put(uri, {machineries, total}, {
        headers: {
                'Authorization': `Bearer ${token}`
            }
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export { rentalMachinery, getRentedMachineries, makePayment }