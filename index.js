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
    Article.findAll({
        limit: 4,
        order: [['id','DESC']]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
        
    });
})

//rota de slug
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


//pagina de categoria especifica com filtro de categoria
app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if (category != undefined) {

            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories});
            });

        }else {
            res.redirect("/");
        }
    }).catch (err => {
        res.redirect("/");
    });
})

app.listen(8080, () => {
    console.log("Servidor rodando com sucesso!");
})