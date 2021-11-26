"use strict";
const simsimiApi = require("./plugins/simsimiApi");
const _sticker = require("./plugins/sticker");
const answerBrainly = require("./plugins/answerBrainly");
const downloadMedia = require("./plugins/downloadMedia");
const iplocation = require("./plugins/ipLocation");
const transcriber = require("./plugins/transcriber");
const file_name = require("./plugins/fileName");
const venom = require('venom-bot');


function ver_data() {
    const data = new Date();
    const dia = data.getDate(); // 1-31

    const mes = data.getMonth(); // 0-11 (zero=janeiro)

    const ano4 = data.getFullYear(); // 4 dígitos

    const hora = data.getHours(); // 0-23

    const min = data.getMinutes(); // 0-59

    const seg = data.getSeconds(); // 0-59
    // Formata a data e a hora (note o mês + 1)

    const str_data = "Data: " + dia + '/' + (mes + 1) + '/' + ano4;
    const str_hora = "Hora: " + hora + ':' + min + ':' + seg;
    return str_data + "\n" + str_hora;
}


async function startCommandsText(client, message) {
    try {
        const command = message.body.split(" ");

        switch (command[0]) {
            case "/start":
                await client.reply(message.from, "Oi, Estou aqui!!!", message.id.toString());
                break;

            case "/info":
                if (message.isGroupMsg) {
                    await client.reply(message.from, `Tipo de mensagem:${message.type}\nTexto:${message.body}\nMessagem de ${message.from}\nPara ${message.to}\nDe: ${message.chat.contact.pushname}\nDe grupo: ${message.isGroupMsg}\nNome arquivo: ${message.filename}`, message.id.toString());
                }

                break;

            case "/status":
                await client.reply(message.from, `_Estou aqui_\n${ver_data()}`, message.id.toString());
                break;

            case "/brainly":
                //await answerBrainly.sendAnswerBrainly(client, message);
                client.reply(message.from, "Não tenho ainda uma api do brainly :(", message.id.toString());
                break;
            case "/iplocation":
                let response = await iplocation.searchAddress(message.body.replace("/iplocation", ""));
                if (response["success"]){
                    client.reply(message.from, response["text"], message.id.toString());
                }else {
                    client.reply(message.from, response["text"], message.id.toString());
                }
                break;
            case "/getvoice":
                await transcriber.sendTextToVoice(client, message);
                break;
            default:
                try {
                    if (!message.isGroupMsg) {
                        await client.sendText(message.from, await simsimiApi.sendMessageSimSimi(message.body.toLowerCase().replace("simsimi", "")));
                    } else if (message.isGroupMsg && message.body.toLowerCase().includes("simsimi")) {
                        await client.reply(message.from, await simsimiApi.sendMessageSimSimi(message.body.toLowerCase().replace("simsimi", "")), message.id.toString());
                    }
                } catch (e) {
                    console.log(e);
                }

        }
    } catch (e) {
        console.error(e);
    }
}

async function startCommandsMedia(client, message) {
    switch (message.caption) {
        case "/sticker":
            await _sticker.sendSticker(client, message);
            break;

        default:
            await downloadMedia.downloadMediaToDirectory(client, message, file_name.get());
    }
}

async function startApplication(client) {
    client.sendText("15793003326-1621400816@g.us", "Bot Iniciado 🤪").then(r => console.log(r));
    client.onMessage(async message => {
        await startCommandsText(client, message);
        await startCommandsMedia(client, message);
    });
}

venom.create('LucasBot', (base64Qrimg, asciiQR, attempts) => {
    console.log(asciiQR);
}, (statusSession, session) => {
    console.log(session);
}, {
    useChrome: false,
    browserArgs: ['--no-sandbox']
}).then(client => startApplication(client)).catch(error => console.log(error));
