var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/", function (req, res) {
    pontuacaoController.inserirPontuacao(req, res);
})

router.get("/:idUsuario", function (req, res) {
    pontuacaoController.getPontuacao(req, res);
})

module.exports = router;