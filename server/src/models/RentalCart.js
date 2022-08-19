const { Schema, model } = require('mongoose');



const rentalCartSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    machinery: {
        type: Schema.Types.ObjectId,
        ref: 'Machinery'
    },
    days: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});


module.exports = model('RentalCart', rentalCartSchema);
