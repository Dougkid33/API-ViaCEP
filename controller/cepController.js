const cepService = require('../services/cepService');
//const logger = require('./logger');

const consultaCep = async (req, res) => {
  const cep = req.params.cep;

  const cepData = await cepService.getCepData(cep);

  if (!cepData) {
    return res.status(404).json({ message: 'CEP não encontrado' });
  }

  return res.json(cepData);
};


const editarCep = async (req, res) => {
  const { cep } = req.params; // O CEP será passado como parâmetro na URL
  const data = req.body; // Os dados a serem atualizados são passados no corpo da requisição

  try {
    // Chama o serviço para atualizar os dados
    const updatedCep = await cepService.updateCep(cep, data);

    if (!updatedCep) {
      return res.status(404).json({ message: 'CEP não encontrado' });
    }

    return res.json(updatedCep);
  } catch (error) {
    console.log(`Erro ao editar o CEP ${cep}: ${error.message}`);
    return res.status(500).json({ message: 'Erro ao editar o CEP' });
  }
};


// Função para listar todos os CEPs
const listarCeps = async (req, res) => {
  try {
    const ceps = await cepService.getAllCeps(); // Chama o serviço para listar todos os CEPs
    return res.json(ceps);
  } catch (error) {
    console.log('Erro ao listar todos os CEPs: ' + error.message);
    return res.status(500).json({ message: 'Erro ao listar os CEPs' });
  }
};

// Função para listar apenas os CEPs favoritos
const listarCepsFavoritos = async (req, res) => {
  try {
    const favoriteCeps = await cepService.getFavoriteCeps(); // Chama o serviço para listar apenas os CEPs favoritos
    return res.json(favoriteCeps);
  } catch (error) {
    console.log('Erro ao listar CEPs favoritos: ' + error.message);
    return res.status(500).json({ message: 'Erro ao listar CEPs favoritos' });
  }
};


module.exports = { consultaCep, editarCep, listarCeps, listarCepsFavoritos };
