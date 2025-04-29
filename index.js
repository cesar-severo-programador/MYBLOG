const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

//controllers import
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const UsersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/user");





//view engine
app.set('view engine', 'ejs');

//sessions
app.use(session({
    secret: "galinhaassadajh",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 30000000}
}));

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
app.use("/", UsersController);




/*Testando section
app.get("/section", (req, res) => {
    req.session.treinamento = "treinando",
    req.session.ano = "2025",
    req.session.nome = "jhonatan",
    req.session.email = "jhonatan@gmail.com",
    req.session.user = {
        nome: "cesar",
        email: "cesar@gmail.com"
    }
    res.send("sessão criada");
});

app.get("/leitura", (req,res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        nome: req.session.nome,
        email: req.session.email,
        user: req.session.user
    })
});

*/

//rota da pagina inicial
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