require('dotenv').config();



module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientURL: process.env.CLIENT_URL
}