const { Schema, model } = require('mongoose');
const { jwtSecret } = require('../config')

const userSchema = Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    picture: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'normal',
        enum: ['normal','subscribed','admin']
    },
    status: {
        type: Boolean,
        required: true
    },
    google: {
        type: Boolean,
        default: false
    },
    machineries: [{
        type: Schema.Types.ObjectId,
        ref: 'Machinery'
    }],
    verificationCode: {
        type: String
    },
    rentalCart: [{
        type: Schema.Types.ObjectId,
        ref: 'Machinery'
    }]
    
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, jwtSecret, { expiresIn: '1h' });
    return token;
}

userSchema.methods.isSuscribed= function() {
    return this.role === 'suscribed';
}

// userSchema.methods.findByIdAndGenerateAuthToken = async function(id) {
//     const user = await User.findById(id);
//     if (!user) {
//         throw new Error('User not found');
//     }
//     const token = user.generateAuthToken();
//     return token
// }


userSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('User', userSchema);