# 📝 MyBlog

Portal de blog criado com Node.js, Express e Sequelize. O sistema já conta com painel administrativo completo, cadastro de categorias, criação de postagens com editor de texto e autenticação de usuários com sessões.
![Página Principal do Site](https://github.com/cesar-severo-programador/MYBLOG/blob/main/screenshot.jpg)

💡 Projeto em constante evolução, com foco em aprendizado real e aplicação prática.

---

## ✅ Funcionalidades atuais

- 🛠️ Painel administrativo (Dashboard)
- 🗂️ Cadastro e edição de categorias
- 📝 Criação e edição de postagens com TinyMCE
- 🔗 URLs amigáveis com Slugify
- 🔐 Login com autenticação via sessão (Express-session)
- 📄 Layout dinâmico com EJS
- 👥 Controle de usuários com bcryptjs

---

## 🚀 Tecnologias utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) **Node.js**
- ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) **Express**
- ![EJS](https://img.shields.io/badge/EJS-0275d8?style=flat&logo=javascript&logoColor=white) **EJS**
- ![MySQL](https://img.shields.io/badge/MySQL-00758F?style=flat&logo=mysql&logoColor=white) **MySQL + Sequelize**
- ![bcryptjs](https://img.shields.io/badge/Bcryptjs-ef4444?style=flat&logo=javascript&logoColor=white) **bcryptjs**
- **body-parser**, **express-session**, **slugify**
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

---

## 🔐 Login de demonstração (acesso ao painel)

- **Login:** `admin@admin.com`  
- **Senha:** `admin`

---

## 📸 Capturas de tela

### 🔹 Página inicial (Home)
![Home principal](https://github.com/cesar-severo-programador/MYBLOG/blob/main/screenshot%201.png)

### 🔹 Lista de artigos
![Home artigos](https://github.com/cesar-severo-programador/MYBLOG/blob/main/screenshot%204.png)

### 🔹 Categorias no Dashboard
![Home artigos](https://github.com/cesar-severo-programador/MYBLOG/blob/main/screenshot%205.png)

---

## 📂 Estrutura do projeto

myblog/
├── controllers/
├── models/
├── views/
├── public/
├── routes/
├── config/
├── app.js
└── package.json


---

## 📦 Instalação e uso

```bash
# Clone o repositório
git clone https://github.com/cesar-severo-programador/myblog.git

# Acesse a pasta
cd myblog

# Instale as dependências
npm install

# Configure seu banco de dados no arquivo: config/database.js

# Rode o projeto
node app.js


```
🔗 Acesse no navegador:
http://localhost:3000

📌 Melhorias futuras planejadas
 📷 Upload de imagem nas postagens

 🧭 Melhorar layout do menu de navegação

 📱 Ajustar responsividade para dispositivos móveis

 💬 Sistema de comentários

 📊 Painel de estatísticas para o administrador

👨‍💻 Autor
César Severo
💼 LinkedIn
🐙 GitHub

Projeto criado para estudo prático de back-end com Node.js, mas evoluindo para algo real e utilizável com cada nova melhoria.
