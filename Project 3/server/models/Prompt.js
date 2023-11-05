const { Schema, model } = require('mongoose');

// const { Schema } = mongoose;

const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});

// const Prompt = mongoose.model('prompt', promptSchema);
const Prompt = model('Prompt', promptSchema);

module.exports = Prompt;
