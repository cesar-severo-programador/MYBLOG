# 📝 MyBlog

Portal de blog criado com Node.js, Express e Sequelize. O sistema já conta com painel administrativo, cadastro de categorias, criação de postagens e autenticação de usuário com sessões.

## ✅ Funcionalidades atuais

- Painel de administração (Dashboard)
- Cadastro e edição de categorias
- Cadastro e edição de postagens
- URLs amigáveis com Slugify
- Login com sessão (Express-session)
- Layout utilizando EJS

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express**
- **EJS**
- **MySQL + Sequelize**
- **bcryptjs**
- **body-parser**
- **express-session**
- **slugify**

## 📂 Estrutura do projeto

```
myblog/
├── controllers/
├── models/
├── views/
├── public/
├── routes/
├── config/
├── app.js
└── package.json
```

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

Acesse no navegador:  
**http://localhost:3000**

## 📌 Melhorias futuras planejadas

- [ ] Inserir upload de imagem nas postagens
- [ ] Melhorar layout do menu de navegação
- [ ] Ajustar responsividade com base nas imagens dos posts
- [ ] Adicionar sistema de comentários
- [ ] Criar painel com estatísticas do blog

## 👨‍💻 Autor

**César Severo**  
💼 [LinkedIn](https://www.linkedin.com/in/cesar-severo)  
🐙 [GitHub](https://github.com/cesar-severo-programador)

---

> Projeto desenvolvido para fins de prática e aprimoramento em backend com Node.js.
```
