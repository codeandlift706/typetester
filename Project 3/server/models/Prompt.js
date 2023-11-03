const { Schema, model } = require('mongoose');

const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Prompt = model('Prompt', promptSchema);

module.exports = Prompt;
