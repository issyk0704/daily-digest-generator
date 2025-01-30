const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    preferences: { type: Object, default: {} },
});

module.exports = mongoose.model('User', UserSchema);
