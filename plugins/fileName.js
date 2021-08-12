module.exports = {
    get: () => {
            const data = new Date();
        
            const dia = data.getDate(); // 1-31
        
            const mes = data.getMonth(); // 0-11 (zero=janeiro)
        
            const ano4 = data.getFullYear(); // 4 dígitos
        
            const hora = data.getHours(); // 0-23
        
            const min = data.getMinutes(); // 0-59
        
            const seg = data.getSeconds(); // 0-59
            // Formata a data e a hora (note o mês + 1)
        
            const str_data = dia + '-' + (mes + 1) + '-' + ano4;
            const str_hora = hora + ':' + min + ':' + seg;
            return str_data + '-' + str_hora;
    }
}