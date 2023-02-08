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
    createdAt: Date,
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    images: {
        type: [String]
    }
});

userSchema.pre('save', async function(next) {
    const now = Date.now();
    const hash = await bcrypt.hash(this.password, 10);

    this.createdAt = now;
    this.password = hash;

    next();
});

userSchema.methods.isValidPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('user', userSchema);