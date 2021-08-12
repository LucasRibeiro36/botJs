const axios = require("axios");
require('dotenv').config()

module.exports = {
    searchAddress: async (query) => {
    const response = await axios.get(`http://api.ipapi.com/${query}`, {
        params: {access_key: process.env.IP_TOKEN, format: 1}
    })

    const { zip, ip, continent_name, country_name, region_name, city, latitude, longitude } = response.data

    if (zip) {
        return {success: true, text: `_Dados encontrados:_\n${ip}\n*Continente:* ${continent_name} \n*País:* ${country_name}\n*Região:* ${region_name}\n*Cidade:* ${city}\n*Cep:* ${zip}`, coordinates: {lat: latitude, log: longitude}};
    }
    return {success: false, text: "Dados não encontrados"};
}
}




