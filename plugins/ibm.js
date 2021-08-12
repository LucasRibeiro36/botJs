const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const simsimi = require('./simsimiApi');
const fileName = require('./fileName');
const { resolve } = require('path');
const { rejects } = require('assert');
require('dotenv').config({ path: './ibm-credentials.env'});
const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: process.env.TEXT_TO_SPEECH_APIKEY }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com'
  });

module.exports = {
    GetVoiceSimsimi: async (text, location) => {
        const params = {
        text: await simsimi.sendMessageSimSimi(text),
        voice: 'pt-BR_IsabelaVoice', // Optional voice
        accept: 'audio/wav'
        };
        
        // Synthesize speech, correct the wav header, then save to disk
        // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
        // note that `repairWavHeaderStream` will read the whole stream into memory in order to process it.
        // the method returns a Promise that resolves with the repaired buffer
        textToSpeech
        .synthesize(params)
        .then(response => {
            const audio = response.result;
            return textToSpeech.repairWavHeaderStream(audio);
        })
        .then(repairedFile => {
            fs.writeFileSync('audio.wav', repairedFile);
            console.log('audio.wav written with a corrected wav header');
        })
        .catch(err => {
            console.log(err);
        });
    },
    GetVoice: async (text) => {
        const params = {
        text: text,
        voice: 'pt-BR_IsabelaVoice', // Optional voice
        accept: 'audio/mp3'
        };
        return new Promise(
            async (resolve,rejects) => {
                try {
                    const file = "files/" + fileName.get() + ".mp3";
                    const response = await textToSpeech.synthesize(params)
                    const audio = response.result;
                    await audio.pipe(fs.createWriteStream(file));
                    const millisecondsToWait = 1000;
                    setTimeout(() => {
                        resolve(file);
                    }, millisecondsToWait);
                } catch (err) {
                    console.log(err);
                    rejects(err);
                }   
            });
        }}  