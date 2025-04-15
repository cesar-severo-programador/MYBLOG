const express = require("express");
const router = express.Router();
const User = require("./user");
const bcrypt = require('bcryptjs');
const adminAuth = require("../middlewares/adminAuth");



router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users});
    });
});


router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create");
});


//criando usuario
router.post("/users/create", adminAuth, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    //validando se o email ja existe
    User.findOne({where: { email: email}}).then( user => {
        if(user == undefined){

                //criptografando a senha
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                User.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.redirect("/");
                }).catch((err) => {
                    res.redirect("/");
                });
        }else{
            res.redirect("/admin/users/create");
        }
    });

});

//pagina de login
router.get("/login", (req,res) => {
    res.render("admin/users/login");
});

//fazendo login
router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then( user => {
        if(user != undefined){ //se existe um usuario com esse email
            //validando a senha
            var correct = bcrypt.compareSync(password, user.password);
            if (correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            }else {
                res.redirect("/login");
            }

        }else{
            res.redirect("/login");
        }
    })
});

//fazendo logout
router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;