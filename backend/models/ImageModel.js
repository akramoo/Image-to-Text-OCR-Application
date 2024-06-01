const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  path: String,
  text: String,
  txtFilePath: String,
});

module.exports = mongoose.model('Image', imageSchema);
