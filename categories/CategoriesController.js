const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");


router.get("/admin/categories/new", adminAuth, (req,res) => {
    res.render('admin/categories/new');
});

//Salvar Categorias
router.post("/categories/save", adminAuth, (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        })

    }else {
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories", adminAuth, (req,res) => {
    Category.findAll().then(categories => {
      res.render('admin/categories/index', {categories: categories});

    });  
});


//deletando categoria
router.post("/categories/delete", adminAuth, (req,res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN (id)){ //verificando se é um numero

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });

        }else { ///não é um numero
            res.redirect("/admin/categories");
        }

    }else { //null
        res.redirect("/admin/categories");
    }
});

//Editando categorias
router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {

    var id = req.params.id;

    if(!/^\d+$/.test(id)){
        return res.redirect("/admin/categories");    
    }

    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit", {category: category});
        }else {
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    });
});

//Atualizar categorias
router.post("/categories/update", adminAuth, (req,res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    })
});

module.exports = router;