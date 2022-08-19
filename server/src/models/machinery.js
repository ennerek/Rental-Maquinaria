const { Schema, model } = require('mongoose');
const { jwtSecret } = require('../config')

const machinerySchema = Schema({
    marca : {
        type: String
    },
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    departments : {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    status: {
        type: Boolean,
        default: true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isRented: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
    }
});


module.exports = model('Machinery', machinerySchema);