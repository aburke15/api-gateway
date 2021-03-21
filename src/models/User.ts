import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        max: 50
    },
    lastName: {
        type: String,
        required: false,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    username: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    phone: {
        type: String,
        required: false,
        min: 10,
        max: 11
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export = mongoose.model('User', userSchema);
