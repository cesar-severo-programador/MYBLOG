const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const { or } = require("sequelize");



router.get("/admin/articles", (req,res) => {
    Article.findAll({
        include: [{model: Category}],
        order: [['id','DESC']]
    }).then(article => {
        res.render("admin/articles/index", {articles: article});
    });
});

/*

app.get("/",(req,res) =>{

    Pergunta.findAll({ raw: true, order: [
            ['id','DESC'] //ASC = Crescente DESC = Decrescente ordenação da lista
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });

    
});
*/

router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then( categories => {
        res.render("admin/articles/new", {categories: categories})
    });
});

router.post("/admin/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

router.post("/articles/delete", (req,res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN (id)){ //verificando se é um numero

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });

        }else { ///não é um numero
            res.redirect("/admin/articles");
        }

    }else { //null
        res.redirect("/admin/articles");
    }
});

module.exports = router;