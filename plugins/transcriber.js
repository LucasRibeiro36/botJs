const ibm = require('./ibm');


module.exports = {
    sendTextToVoice: async (client, message) => {
        await ibm.GetVoice(message.body.replace("/getvoice", "")).then (async (result) => {
            await client.sendVoice(message.from, result);
    }).catch(err => {
        console.log(err);
    });
    }
};
