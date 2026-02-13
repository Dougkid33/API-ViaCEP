require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const cepRoutes = require('./routes/cepRoutes');
//const logger = require('./logger');

// Inicializando o aplicativo
const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados MongoDB
connectDB();

// Usar as rotas
app.use(cepRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
