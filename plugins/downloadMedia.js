const fs = require('fs');
const mime = require('mime-types');

module.exports = {
    downloadMediaToDirectory: async (client, message, file_name) => {
        if (message.isMedia === true || message.isMMS === true || message.type === "document") {
            if (message.filename) {
                console.log("Baixando Arquivo para o Servidor");
                const buffer = await client.decryptFile(message);
                const fileName = `files/${message.filename}`;
                fs.writeFile(fileName, buffer, err => console.log(err));
            } else {
                console.log("Baixando Arquivo para o Servidor");
                const buffer = await client.decryptFile(message);
                const fileName = `files/${file_name}.${mime.extension(message.mimetype)}`;
                fs.writeFile(fileName, buffer, err => console.log(err));
            }
        }
    }
    }