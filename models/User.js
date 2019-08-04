const mongoose = require('mongoose');
userSchema = require('../db/schemas/userSchema');

module.exports = mongoose.model('User', userSchema);
