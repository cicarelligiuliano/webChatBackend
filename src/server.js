//server.js
const express = require('express');
const chat = require('./db');
const app = express();
const { BASE_URL } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.use('/deleteDatabase', (req, res) => {
    chat.deleteDatabase();

    res.json({ message: 'Database deleted successfully' });
});

app.use('/', (req, res) => {
    res.redirect(`${BASE_URL}/public/index.html`);
});


module.exports = app;
