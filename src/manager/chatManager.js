// manager/chatManager.js
const fs = require('fs');
const path = require('path');

class chatManager {
    constructor(chatPath) {
        this.messages = [];
        this.chatPath = chatPath;
        this.preload();
    }

    //Dentro de la clase UserManager
    preload() {
        if (fs.existsSync(path.resolve(__dirname, this.chatPath))) {
            const archivo = fs.readFileSync(path.resolve(__dirname, this.chatPath), 'utf8');
            const data = JSON.parse(archivo);

            this.messages = data;

            return this.messages;
        } else {
            this.save(this.messages);
            return this.messages;
        }
    }

    getChat() {
        this.preload();
        return this.messages;
    }

    save(messages) {
        fs.writeFileSync(path.resolve(__dirname, this.chatPath), JSON.stringify(messages, null, 2), 'utf8');
    }

    addMessage({ user, message, date }) {
        const newMessage = {
            user,
            message,
            date,
        };

        this.messages.push(newMessage);
        this.save(this.messages);

        return newMessage;
    }

    deleteDatabase() {
        this.save([]);
    }
}

module.exports = chatManager;
