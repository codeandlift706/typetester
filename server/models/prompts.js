const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Quote = mongoose.model('prompt', promptSchema);

module.exports = Quote;
