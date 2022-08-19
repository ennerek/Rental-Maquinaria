const { Schema, model } = require('mongoose');
const { jwtSecret } = require('../config')

const departmentSchema = Schema({
    name : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    }
    
});


module.exports = model('Department', departmentSchema);