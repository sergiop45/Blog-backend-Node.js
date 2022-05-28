const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article= require("./Article");
const { default: slugify } = require("slugify");

router.get("/articles", (req, res) => {
    Article.findAll({order:[ [ 'id','DESC']]}).then(artigos => {
        
    
        res.render("admin/articles/index", {artigos: artigos});
    
     
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(category => {
        res.render("admin/articles/new", {category: category});
    });
    
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/admin/articles/index");
    }

    Article.findByPk(id).then(article => {

        if (id != undefined) {

            Category.findAll().then((category) => {
                res.render("admin/articles/edit", {article: article, category: category});
            })

            
        } else {
            res.redirect("/admin/articles/index");
        }
        
    });
});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({body:body, title: title, slug: slugify(title), categoryId:category},
     {where: { id: id }}).then(() => {
         res.redirect("/articles");
     }).catch(() => {
         res.send("erro ao editar");
     });

    
});


router.get("/admin/articles/delete/:id", (req,res) => {
    var id = req.params.id;

    Article.destroy({where: {id:id}}).then(() => {
        res.redirect("/articles");
    }).catch(() => {
        res.send("erro ao tentar deletar")
    });
});

router.post("/articles/save", (req,res) => {
    var body = req.body.body;
    var title = req.body.title;
    var idcategory = req.body.category;

    if(body != undefined && title != undefined) {
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: idcategory
        }).then(() => res.redirect("/articles"));
    } else {
        res.redirect("/admin/articles/new");
    }
});

module.exports = router;