const Sequelize = require("sequelize");
const connection = require("../database/database");

const Users = connection.define("users", {
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Users.sync({force: false}).then(console.log("tabela criada")).catch(error => {
    console.log("erro ao tentar criar tabela users. Erro: " + error);
});

module.exports = Users;