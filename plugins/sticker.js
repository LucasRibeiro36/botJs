const fs = require('fs');
const mime = require('mime-types');

module.exports = {
    sendSticker: async (client, message) => {
        if (message.isMedia && message.type === 'image') {
            await client.reply(message.from, "calma ae", message.id.toString()).then()
            try {
                //const file_title = message.from;
                const filename = `${message.t}.${mime.extension(message.mimetype)}`;
                const final_path = 'files/' + filename;
                //const filename = 'teste.jpg';
                const mediaData = await client.decryptFile(message);
                //const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`;
                fs.writeFile(final_path, mediaData, err => {
                    if (err) {
                        return console.log(err);
                    }
                    //ARQUIVO SALVO SUCESSO
                    console.log("Nome da imagem: " + filename);
                    console.log("Caminho da imagem: " + final_path);
                    console.log('O arquivo foi salvo!');
    
                    //ENVIANDO FIGURINHA:
                    client.sendImageAsSticker(message.from, final_path)
                        .then((result) => {
                            console.log('Result: ', result); //return object success
    
                            //APAGA ARQUIVO DO SERVIDOR
                            const millisecondsToWait = 10000;
                            setTimeout(() => {
                                fs.unlink(final_path, (err) => {
                                    if (err) {
                                        console.log("failed to delete local sticker-img file:" + err);
                                    } else {
                                        console.log('successfully deleted sticker-img file');
                                    }
                                });
                            }, millisecondsToWait);
                        })
                        .catch((error) => {
                            console.error('Error when sending: ', error); //return object error
                            client.reply(message.from, 'Não foi possível processar o conteúdo solicitado!\nTente novamente mais tarde', message.id.toString()).then();
                        });
                });
    
            } catch (e) {
                client.reply(message.from, 'Não foi possível processar o conteúdo solicitado!\nTente novamente mais tarde', message.id.toString()).then()
            }
        } else {
            client.reply(message.from, 'manda a foto pow', message.id.toString()).then()
        }
    }
}
