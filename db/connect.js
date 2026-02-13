const mongoose = require('mongoose');
//const logger = require('../utils/logger');

// A string de conexão diretamente no código
const mongoURI = "mongodb+srv://douglasmarcelino33:sbRj5zbw1uoZ31wF@hackathondatabase.xxr0f.mongodb.net/?appName=HackathonDatabase";

const connectDB = async () => {
  try {
    // Conectando diretamente usando a string mongoURI
    await mongoose.connect(mongoURI);
    console.info('Conectado ao MongoDB Atlas');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB Atlas', err);
    process.exit(1); // Encerra a aplicação em caso de erro
  }
};

module.exports = connectDB;
