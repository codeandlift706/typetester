const express = require('express');
const mongoose = require('mongoose');
const prompts = require('./models/prompts');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/db-name', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/prompts', async (req, res) =>{
    try{
        const randomPrompt = await prompts.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomPrompt);
    } catch(err){
        console.error('Error fetching prompt', err);
        res.status(500).json({ error: 'server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});