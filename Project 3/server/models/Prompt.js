const { Schema, model } = require('mongoose');

<<<<<<< HEAD
const { Schema } = mongoose;

=======
>>>>>>> b5c109e00dd66848864acb99dc6d3d09363657e7
const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});

<<<<<<< HEAD
const Prompt = mongoose.model('prompt', promptSchema);
=======
const Prompt = model('Prompt', promptSchema);
>>>>>>> b5c109e00dd66848864acb99dc6d3d09363657e7

module.exports = Prompt;
