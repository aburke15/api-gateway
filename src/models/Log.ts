import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    level: {
        type: String,
        max: 10,
        required: false
    },
    error: {
        type: String
    },
    message: {
        type: String
    },
    object: {
        type: Object
    },
    type: {
        type: String,
        max: 50
    }
});

export = mongoose.model('Log', logSchema);
