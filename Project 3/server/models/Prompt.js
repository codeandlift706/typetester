const { Schema, model } = require('mongoose');

const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});

const Prompt = model('Prompt', promptSchema);

module.exports = Prompt;
