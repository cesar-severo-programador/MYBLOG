const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const { or, where } = require("sequelize");



router.get("/admin/articles", (req,res) => {
    Article.findAll({
        include: [{model: Category}],
        order: [['id','DESC']]
    }).then(article => {
        res.render("admin/articles/index", {articles: article});
    });
});


//Novo Artigo
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

//Editando Artigos
router.get("/admin/articles/edit/:id", (req,res) => {
    var id = req.params.id;

    if(!/^\d+$/.test(id)){
        return res.redirect("/admin/articles");    
    }

    Article.findByPk(id).then(article => {

        if(article != undefined) {

            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {categories: categories, article: article});
            });
            
        }else {
            res.redirect("/admin/articles");
        }

    }).catch ( err => {
        res.redirect("/admin/articles");
    });

});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title: title, body: body, categoryId: category, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch ( err => {
        console.error(err); 
        res.redirect("/admin/articles");
    });
});



module.exports = router;