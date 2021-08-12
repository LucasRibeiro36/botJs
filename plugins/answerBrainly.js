const Client = require('brainly-client');

module.exports = {
    sendAnswerBrainly: async (client, message) => {
        const brainly = new Client();
        const answer = message.body.replace("/brainly", "");
        console.log("Pergunta: " + answer);
        try {
            brainly.search(answer)
                .then(questions => {
                    const question = questions[0]
                    const answer = question.answers[0]
                    const itemTitle = question.content.replaceAll("<br />", "\n").replaceAll(/<[^>]*>/g, '');
                    const itemAuthorNick = answer.author.nick;
                    const itemRatingQuestion = answer.rating;
                    const itemThanksCount = answer.thanksCount;
                    const answer_formatted = answer.content.replaceAll("<br />", "\n").replaceAll(/<[^>]*>/g, '');
                    const final_result = "⚠️ *RESULTADO DA PESQUISA!*\n\n" + "_Se não achou a answer/resposta desejada,tente fazer a answer com mais detalhes_" + "\n\n*Pergunta encontrada:* " + itemTitle + "\n\n*Resposta encontrada:* \n" + answer_formatted + "\n\n*Autor da resposta:* " + itemAuthorNick + "\n\n*Avaliação da resposta:* " + itemRatingQuestion + " estrelas" + "\n\n*Curtidas:* " + itemThanksCount;
                    client.reply(message.from, final_result, message.id.toString()).then();
                    console.log(question);
                    console.log(answer);
                })


        } catch (e) {
            client.reply(message.from, 'Não foi possível executar a pesquisa no Brainly :(\n\nTente novamente', message.id.toString()).then();
        }
    }
}