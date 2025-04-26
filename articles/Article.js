const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");


const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

//Atigos e categorias se relacionam
//hasMan em muitos, relacionemento 1 p muitos
Category.hasMany(Article);
//Atigos e categorias se relacionam
//belongsTo pertence a, relacionemento 1 p 1
Article.belongsTo(Category);





module.exports = Article;