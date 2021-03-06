const axios = require("axios");

module.exports = {
    sendMessageSimSimi: async (text) => {
        const response = await axios.get("https://api.simsimi.net/v2", {
        params: {lang: 'pt', text: text}
    })
    return response.data["success"];
    }
}
