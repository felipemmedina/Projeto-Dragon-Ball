var pontuacaoModel = require("./models/pontuacaoModel");

function inserirPontuacao(req, res) {
    var idUsuario = req.body.idUsuario;
    var pontuacao = req.body.pontuacao;
    var nivel = req.body.nivel;

    if (idUsuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Sua pontuacao está indefinida!");
    } else if (nivel == undefined) {
        res.status(400).send("Seu nivel está indefinido!");
    } else {
        pontuacaoModel.inserirPontuacao(idUsuario, pontuacao, nivel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    inserirPontuacao
}
