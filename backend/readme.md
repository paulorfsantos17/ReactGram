# ReactGram - Backend

🧾 API REST para a aplicação ReactGram, uma rede social de compartilhamento de fotos, construída com Express e MongoDB.

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- MongoDB (via Mongoose)
- Multer (upload de arquivos)
- JWT (autenticação)
- bcryptjs (criptografia de senhas)
- express-validator (validações)
- dotenv (variáveis de ambiente)
- CORS
- Nodemon (desenvolvimento)

## 📦 Como instalar e rodar

1. Clone este repositório e entre na pasta do backend:
```bash
git clone https://github.com/paulorfsantos17/ReactGram.git
cd ReactGram/backend
```
Instale as dependências:

```bash
npm install
```
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

env
Copiar código
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
Inicie o servidor:

```bash
npm run server
```
O servidor será iniciado em http://localhost:5000.

📌 Status: Em andamento
Este é o backend da aplicação ReactGram. O frontend está localizado na pasta frontend deste repositório.
