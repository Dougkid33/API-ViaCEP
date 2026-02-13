const axios = require('axios');
const Cep = require('../models/cepModel');
//const logger = require('./logger');

const viaCepUrl = process.env.VIA_CEP_URL;

const getCepData = async (cep) => {
  try {
    let cepData = await Cep.findOne({ cep });

    if (!cepData) {
      console.log(`Consultando ViaCEP para o CEP: ${cep}`);
      const response = await axios.get(`${viaCepUrl}/${cep}/json/`);

      if (response.data.erro) {
        console.log(`CEP não encontrado: ${cep}`);
        return null;
      }

      cepData = new Cep(response.data);
      await cepData.save();
      console.log(`CEP ${cep} adicionado ao banco de dados`);

      return response.data;
    }

    console.log(`CEP encontrado no banco de dados: ${cep}`);
    return cepData;
  } catch (error) {
    console.log(`Erro ao consultar o CEP: ${cep}. Erro: ${error.message}`);
    throw new Error('Erro ao consultar o CEP');
  }
};

// #region Editar e Favoritar CEP
const updateCep = async (cep, data) => {
  try {
    // Validar se o campo cep está no objeto data
    if (data.cep) {
      console.log('Não é permitido alterar o campo CEP');
      throw new Error('Não é permitido alterar o campo CEP');
    }

    // Atualiza os campos do CEP (exceto o campo 'cep')
    const updatedCep = await Cep.findOneAndUpdate(
      { cep },
      { $set: data },  // Atualiza os dados com os campos fornecidos
      { new: true }     // Retorna o documento atualizado
    );

    if (!updatedCep) {
      console.log(`CEP não encontrado para atualização: ${cep}`);
      return null;
    }

    console.log(`CEP ${cep} atualizado com sucesso`);
    return updatedCep;
  } catch (error) {
    console.log(`Erro ao atualizar o CEP ${cep}: ${error.message}`);
    throw new Error('Erro ao atualizar o CEP');
  }
};




const getAllCeps = async () => {
  try {
    const ceps = await Cep.find(); // Retorna todos os documentos da coleção de CEPs
    console.log('Listagem de todos os CEPs realizada com sucesso');
    return ceps;
  } catch (error) {
    console.log('Erro ao listar os CEPs: ' + error.message);
    throw new Error('Erro ao listar os CEPs');
  }
};

// Função para listar apenas os CEPs favoritos
const getFavoriteCeps = async () => {
  try {
    const favoriteCeps = await Cep.find({ snfavorito: true }); // Filtra os CEPs onde snfavorito é true
    console.log('Listagem de CEPs favoritos realizada com sucesso');
    return favoriteCeps;
  } catch (error) {
    console.log('Erro ao listar os CEPs favoritos: ' + error.message);
    throw new Error('Erro ao listar os CEPs favoritos');
  }
};

module.exports = { getCepData, updateCep, getAllCeps, getFavoriteCeps };
