require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const pkg = require('./package.json');

require('console.table');

console.log(logo(pkg).render());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(`Connection created!`)
);

db.connect(err => {
    if (err) console.error(err);
});