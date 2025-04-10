const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//controllers import
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");




//view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'))

//bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conection sucessful");
    }).catch((error) => {
        console.log(error);
    })

 
//controllers
app.use("/", categoriesController);
app.use("/", articlesController);


//rota
app.get("/",(req,res) => {
    Article.findAll().then(articles => {
        res.render("index", {articles: articles});
    });
})

app.listen(8080, () => {
    console.log("Servidor rodando com sucesso!");
})