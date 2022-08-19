const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

const client = new OAuth2Client(config.googleClientID);

const googleVerify = async (token = '') => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.googleClientID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const { email, name, picture } = ticket.getPayload();

  return { email, name, picture };
  
};

module.exports = {
  googleVerify,
};
