const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/snake_game', { useNewUrlParser: true, useUnifiedTopology: true });

const scoreSchema = new mongoose.Schema({
    score: Number,
    username: String,
});

const Score = mongoose.model('Score', scoreSchema);

app.post('/saveScore', async (req, res) => {
    const { score, username } = req.body;
    const newScore = new Score({ score, username });
    await newScore.save();
    res.json({ message: 'Score saved' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
