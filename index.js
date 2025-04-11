const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//controllers import
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const { where } = require("sequelize");




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

        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
        
    });
})


app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
})

app.listen(8080, () => {
    console.log("Servidor rodando com sucesso!");
})