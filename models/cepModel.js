const mongoose = require('mongoose');

const cepSchema = new mongoose.Schema({
  cep: { type: String, required: true, unique: true },
  logradouro: String,
  complemento: String,
  bairro: String,
  localidade: String,
  uf: String,
  ibge: String,
  gia: String,
  ddd: String,
  siafi: String,
  snfavorito: { type: Boolean, default: false },
});

const Cep = mongoose.model('Cep', cepSchema);

module.exports = Cep;
