import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    refreshToken: {
        type: String,
        max: 1024
    }
});

export = mongoose.model('RefreshToken', refreshTokenSchema);
