// db/index.js
const chatManager = require('../manager/chatManager');

const chat = new chatManager('../db/chat.json');

module.exports = chat;
