const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");
const multer = require("multer");
const path = require("path");

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/articles"); // Pasta onde serão salvas as imagens
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Exemplo: 1714152345000.png
    }
});

const upload = multer({ storage: storage });


router.get("/admin/articles", adminAuth, (req,res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(article => {
        res.render("admin/articles/index", {articles: article});
    });
});


//Novo Artigo
router.get("/admin/articles/new", adminAuth,  (req,res) => {
    Category.findAll().then( categories => {
        res.render("admin/articles/new", {categories: categories})
    });
});

router.post("/admin/articles/save", adminAuth, upload.single("image"), (req, res) => {
    const { title, body, category } = req.body;
    const image = req.file ? "/uploads/articles/" + req.file.filename : null;

    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId: category,
        image
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        console.error(err);
        res.redirect("/admin/articles");
    });
});




router.post("/articles/delete", adminAuth, (req,res) => {
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
router.get("/admin/articles/edit/:id", adminAuth, (req,res) => {
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

router.post("/articles/update", adminAuth, upload.single("image"), (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    var image = req.file ? "/uploads/articles/" + req.file.filename : null;

    let updatedFields = { title, body, categoryId: category, slug: slugify(title) };

    if (image) {
        updatedFields.image = image;
    }

    Article.update(updatedFields, {
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch (err => {
        console.error(err); 
        res.redirect("/admin/articles");
    });
});



//paginação
router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    var offset = 0;
    if(isNaN(page) || page == 1){
        offset = 0;
    }else {
        offset = (parseInt(page) - 1)* 4;
    }
     
    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [['id','DESC']]
    }).then(articles => {
        var next;
        if(offset + 4 >= articles.count){
            next = false;
        }else {
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result: result, categories: categories})
        });

        //res.json(result);

        });
});




module.exports = router;