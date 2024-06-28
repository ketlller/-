const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/snakegame', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    coins: Number,
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Telegram Bot setup
const bot = new Telegraf('7211914916:AAFih8y3EyEpgyXMD6WLHqdUcc00fCSf2ng');

bot.start((ctx) => {
    ctx.reply(`Welcome ${ctx.from.username}!`);
});

bot.launch();

app.get('/user/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        res.json(user);
    });
});

app.post('/user/:id/coins', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        user.coins = req.body.coins;
        user.save(err => {
            if (err) return res.status(500).send(err);
            res.json(user);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
