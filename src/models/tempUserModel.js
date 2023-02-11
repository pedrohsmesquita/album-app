const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tempUserSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    confirmationCode: {
        type: String
    },
    expireAt: {
        type: Date,
        expires: 3600
    }
});

tempUserSchema.pre('save', async function(next) {
    const now = Date.now();
    const hash = await bcrypt.hash(this.password, 10);

    this.createdAt = now;
    this.expireAt = now;
    this.password = hash;

    next();
});

module.exports = mongoose.model('tempUser', tempUserSchema);