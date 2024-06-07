var pontuacaoModel = require("../models/pontuacaoModel");

function inserirPontuacao(req, res) {
    var idUsuario = req.body.idUsuario;
    var pontuacao = req.body.pontuacao;

    if (idUsuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Sua pontuacao está indefinida!");
    } else {
        pontuacaoModel.inserirPontuacao(idUsuario, pontuacao)
            .then(
                function (resultado) {
                    res.status(200);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro inserir pontuacao! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function getPontuacao(req, res) {
    var idUsuario = req.params.idUsuario

    if (idUsuario == undefined) {
        console.log(idUsuario)
        res.status(400).send("Estou aqui");
        return;
    } 

    pontuacaoModel.getPontuacao(idUsuario)
        .then(
            function (resultadoPontuacoes) {
                console.log(resultadoPontuacoes);
                res.status(200).json(resultadoPontuacoes);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao resgatar a pontuação! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    inserirPontuacao,
    getPontuacao
}
