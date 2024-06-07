var votoModel = require("../models/votoModel");

function salvarVoto(req, res) {
    var idUsuario = req.body.idUsuario;
    var idPersonagem = req.body.idPersonagem;

    if (idUsuario === undefined) {
        console.log("idUsuario esta undefined: " + idUsuario);
        return;
    }

    if (idPersonagem === undefined) {
        console.log("idPersonagem esta undefined " + idPersonagem);
        return;
    }

    votoModel.salvarVoto(idUsuario, idPersonagem)
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
        )
}

function recuperarVotos(req, res) {
    votoModel.recuperarVotos()
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    salvarVoto,
    recuperarVotos
}