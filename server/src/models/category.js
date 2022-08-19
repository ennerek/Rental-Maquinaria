const { Schema, model } = require('mongoose');



const categorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = model('Category', categorySchema);
