const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mariadb', 
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DTB,
});

sequelize.authenticate().then(() => {
    console.log("Authentification Réussie");
}).catch((err) => {
    console.log("Erreur :", err);
});

module.exports = sequelize;
