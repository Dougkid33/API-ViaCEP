const express = require('express');
const cepController = require('../controller/cepController');

const router = express.Router();

router.get('/consulta-cep/:cep', cepController.consultaCep);
router.put('/editar-cep/:cep', cepController.editarCep);
router.get('/listar-ceps', cepController.listarCeps);
router.get('/listar-ceps-favoritos', cepController.listarCepsFavoritos);

module.exports = router;
