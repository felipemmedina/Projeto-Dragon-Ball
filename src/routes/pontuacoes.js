var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/inserir", function (req, res) {
    pontuacaoController.inserirPontuacao(req, res);
})

module.exports = router;