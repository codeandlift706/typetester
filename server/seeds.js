const mongoose = require('mongoose');
const prompts = require('./prompts');

mongoose.connect('mongodb://localhost:27017/db-name', { useNewUrlParser: true, useUnifiedTopology: true });

const promptdata = [
    //placeholders for now
    {text: "What is your favorite color?", author: "Anonymous"},
    {text: "What is your favorite food?", author: "Anonymous"},
    //more quotes here
];

prompts.insertMany(promptdata)
.then(() => {
    console.log('Porompts inserted!');
})
.catch((err) => {
    console.error('Error seeding quotes', err);
})
.finally(() => {
    mongoose.disconnect();
});
