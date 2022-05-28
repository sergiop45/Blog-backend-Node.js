const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const connection = require("./database/database");
const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");
const Category = require("./categories/Category")
const Article = require("./articles/Article")
const UsersController = require("./Users/UsersController");


//conexao com banco de dados
connection.authenticate().then(() => console.log("realizada conexao com DB"))
.catch((err) => console.log("erro ao tentar conectar com DB"));

//arquivos estativos
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.urlencoded( {extended:false}));
app.use(bodyParser.json());

app.use("/", CategoriesController);

app.use("/", ArticlesController);

app.use("/", UsersController);

app.get("/",    (req, res) => {
    Article.findAll({order:[ [ 'id','DESC']]}).then(artigos => {
        res.render("index", {artigos:artigos});
    });
    
});



app.listen(port, (err) => {
    if(err){
        console.log(`erro ${err} ao tentar conectar ao server`);
    } else {
        console.log("Server rdando na porta 8080.");
    }
})