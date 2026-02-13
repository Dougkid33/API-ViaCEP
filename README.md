Claro! Vamos criar um **README** completo para o seu projeto com base nas informações fornecidas no teste técnico, além de incluir orientações sobre o uso do MongoDB, mesmo que ainda não esteja funcionando corretamente. Abaixo está o **README** que inclui as instruções para execução, problemas conhecidos e como utilizar os endpoints.

### **README.md**

```markdown
# API ViaCEP - Teste Técnico Backend

## Descrição

Este projeto é uma **API Backend** que integra com a API da VIACEP, permitindo que um frontend consuma informações sobre os **CEPs** de Porto Alegre, Rio Grande do Sul. A API oferece a capacidade de:

1. Listar os CEPS de Porto Alegre.
2. Exibir os detalhes de um CEP específico.
3. Editar informações de um CEP.
4. Favoritar ou desfavoritar um CEP.
5. Listar os CEPs favoritados.

A aplicação foi desenvolvida utilizando **Node.js** e persiste os dados localmente utilizando o **MongoDB** (embora o MongoDB ainda não esteja funcionando corretamente, será explicado abaixo).

---

## Funcionalidades Implementadas

1. **Endpoint de Listagem de CEPS** (`GET /listar-ceps`):
   - Retorna uma lista de **CEPs**.
   - Cada CEP inclui **rua, cidade, bairro, estado e cep**.

2. **Endpoint de Detalhes de um CEP** (`GET /detalhes-cep/:id`):
   - Retorna as informações detalhadas de um **CEP específico** utilizando o ID.

3. **Endpoint para Edição de CEP** (`PUT /editar-cep/:id`):
   - Permite a **edição de informações** de um **CEP** específico.
   - As alterações são **persistidas localmente**, mesmo após reiniciar o servidor.

4. **Endpoint para Favoritar/Desfavoritar um CEP** (`PUT /favoritar-cep/:id`):
   - Permite **favoritar ou desfavoritar** um CEP, marcando o campo `snfavorito` como `true` ou `false`.
   - O status de favorito é **persistido** para que permaneça após reiniciar o servidor.

5. **Endpoint para Listar CEPS Favoritos** (`GET /listar-ceps-favoritos`):
   - Retorna **somente os CEPS favoritados** (onde `snfavorito === true`).

---

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```

/meu-projeto
├── /controllers         # Contém a lógica de cada endpoint
│   └── cepController.js
├── /db                  # Conexão com o banco de dados
│   └── connect.js
├── /models              # Modelos do MongoDB
│   └── cepModel.js
├── /routes              # Define as rotas da aplicação
│   └── cepRoutes.js
├── /services            # Lógica de negócios, como chamadas à API da VIACEP
│   └── cepService.js
├── /utils               # Funções utilitárias (como o logger)
│   └── logger.js
├── .env                 # Variáveis de ambiente
├── app.js               # Arquivo principal da aplicação
├── package.json         # Dependências e scripts
└── README.md            # Este arquivo

````

---

## Como Rodar o Projeto

### Requisitos

- **Node.js** (recomenda-se a versão LTS)
- **MongoDB** (caso esteja funcionando corretamente no futuro)
  
Caso o MongoDB ainda não esteja funcionando, os dados serão persistidos **somente na memória** e não serão persistidos após reiniciar o servidor.

### Passo a Passo para Executar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Dougkid33/API-ViaCEP.git
   cd API-ViaCEP
````

2. **Instale as dependências**:

   No diretório raiz do projeto, execute:

   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`**:

   Crie o arquivo `.env` na raiz do projeto com a seguinte configuração (substitua pela sua string de conexão do MongoDB):

   ```ini
   MONGO_URI=mongodb+srv://douglasmarcelino33:<db_password>@hackathondatabase.xxr0f.mongodb.net/?appName=HackathonDatabase
   VIA_CEP_URL=https://viacep.com.br/ws
   ```

   Substitua `<db_password>` pela sua senha do MongoDB Atlas.

4. **Execute o servidor**:

   Após configurar o `.env`, execute o servidor:

   ```bash
   npm start
   ```

   O servidor estará disponível na porta `3000`.

---

## Endpoints da API

### 1. **Listar Todos os CEPS**

* **Método**: `GET`
* **Endpoint**: `/listar-ceps`
* **Descrição**: Retorna todos os CEPS cadastrados de Porto Alegre.
* **Exemplo de resposta**:

  ```json
  [
    {
      "cep": "91040-000",
      "logradouro": "Rua Domingos Rubbo",
      "bairro": "Cristo Redentor",
      "localidade": "Porto Alegre",
      "uf": "RS",
      "snfavorito": false
    },
    {
      "cep": "02002000",
      "logradouro": "Rua ABC",
      "bairro": "Centro",
      "localidade": "Porto Alegre",
      "uf": "RS",
      "snfavorito": false
    }
  ]
  ```

### 2. **Detalhes de um CEP**

* **Método**: `GET`
* **Endpoint**: `/detalhes-cep/:id`
* **Descrição**: Retorna os detalhes completos de um CEP específico, usando o `ID` (que é o `ibge`).
* **Exemplo de resposta**:

  ```json
  {
    "cep": "01001000",
    "logradouro": "Praça da Sé",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "snfavorito": false
  }
  ```

### 3. **Editar um CEP**

* **Método**: `PUT`
* **Endpoint**: `/editar-cep/:id`
* **Descrição**: Permite editar as informações de um CEP específico.
* **Exemplo de corpo da requisição**:

  ```json
  {
    "logradouro": "Rua Nova",
    "bairro": "Centro",
    "snfavorito": true
  }
  ```

### 4. **Favoritar/Desfavoritar um CEP**

* **Método**: `PUT`
* **Endpoint**: `/favoritar-cep/:id`
* **Descrição**: Permite marcar um CEP como favorito ou desfavoritar.
* **Exemplo de corpo da requisição**:

  ```json
  {
    "snfavorito": true
  }
  ```

### 5. **Listar CEPS Favoritos**

* **Método**: `GET`
* **Endpoint**: `/listar-ceps-favoritos`
* **Descrição**: Retorna todos os CEPS que estão marcados como favoritos.
* **Exemplo de resposta**:

  ```json
  [
    {
      "cep": "91040-000",
      "logradouro": "Rua Domingos Rubbo",
      "bairro": "Cristo Redentor",
      "localidade": "Porto Alegre",
      "uf": "RS",
      "snfavorito": true
    }
  ]
  ```

---

## Problemas Conhecidos

* **MongoDB não funcionando corretamente**: O MongoDB pode não estar configurado corretamente ou não estar funcionando, então, os dados podem não ser persistidos entre reinicializações. Caso o MongoDB não esteja funcionando, o armazenamento será feito apenas na memória.

* **Dados de exemplo**: A API foi configurada para retornar dados de exemplo diretamente da VIACEP. No entanto, pode haver limitações com a quantidade de dados fornecidos pela API externa.

---

## Contribuindo

Se você deseja contribuir para o projeto, faça um **fork** do repositório, crie uma nova branch com as modificações desejadas e envie um **pull request**.

---
