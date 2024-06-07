var express = require("express");
var router = express.Router();

var votoController = require("../controllers/votoController");

router.post("/", function (req, res) {
    votoController.salvarVoto(req, res);
})

router.get("/", function (req, res) {
    votoController.recuperarVotos(req, res);
})

module.exports = router;