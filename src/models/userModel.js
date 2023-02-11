const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    images: {
        type: [String]
    },
    createdAt: {
        type: Date,
        required: true
    }
});

userSchema.methods.isValidPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('users', userSchema);