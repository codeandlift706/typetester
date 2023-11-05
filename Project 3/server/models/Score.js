const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
    score: {
        type: Number,
        required: true,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Score = model('Score', scoreSchema);

module.exports = Score;
