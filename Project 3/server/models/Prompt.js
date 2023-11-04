const mongoose = require('mongoose');

const { Schema } = mongoose;

const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});

const Prompt = mongoose.model('prompt', promptSchema);

module.exports = Prompt;
