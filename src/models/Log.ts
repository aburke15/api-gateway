import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({});

export = mongoose.model('Log', logSchema);
