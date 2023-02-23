//index.js
require('dotenv').config();
const server = require('./src/socket');

const { PORT } = process.env;
server.listen(PORT, () => {
    console.log('Webchat server listening on port ' + PORT);
});
