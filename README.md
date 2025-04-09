# ReactGram

Rede social de compartilhamento de fotos, estilo Instagram, desenvolvida com **MERN Stack** (MongoDB, Express, React, Node.js).

## 🧠 Visão Geral

O **ReactGram** permite que usuários se cadastrem, façam login, postem imagens, curtam publicações e interajam entre si. A aplicação é dividida em:

- **Frontend:** Interface de usuário feita em React.
- **Backend:** API REST desenvolvida com Node.js, Express e MongoDB.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- React 18
- Redux Toolkit
- React Router DOM
- React Icons
- Testing Library (para testes)
- CRA (Create React App)

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Autenticação)
- BcryptJS (Criptografia de senhas)
- Multer (Upload de imagens)
- Dotenv
- Express Validator
- CORS

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/paulorfsantos17/ReactGram.git
cd ReactGram
```
2. Instale as dependências
Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd ../frontend
npm install
```
3. Configure variáveis de ambiente
Crie um arquivo .env na pasta backend com o seguinte conteúdo:

env
Copiar código
PORT=5000
MONGO_URI=mongodb://localhost:27017/reactgram
JWT_SECRET=sua_chave_secreta

🔐 Ajuste os valores conforme sua configuração local.

4. Inicie os servidores
Backend
```bash
cd backend
npm run server
```

Frontend
Em outro terminal:

```bash
cd frontend
npm start
```
🧪 Testes
Frontend
bash
Copiar código
npm test
⚠️ O backend não possui testes configurados até o momento.

🧾 Status do Projeto
✅ Funcionalidades básicas implementadas
🛠️ Melhorias e novos recursos em andamento

📂 Estrutura de Pastas

ReactGram/
├── backend/        # API Node.js
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── frontend/       # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── services/
🤝 Contribuição
Sinta-se livre para abrir uma issue ou pull request com melhorias, correções ou sugestões!

🧑‍💻 Autor
Paulo Santos
🔗 devpaulo.com | LinkedIn

