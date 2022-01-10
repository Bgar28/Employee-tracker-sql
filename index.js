require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const pkg = require('./package.json');
const queries = require('./queries')
require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(logo(pkg).render())
);

db.connect(err => {
    if (err) {
        console.error(err)
        return
    }
    start()
});

// User is prompted with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function start() {
    inquirer.prompt([
        {
            type: 'list',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit'],
            name: 'option'
        }
    ])
        .then(({ option }) => {
            console.log(option)
            switch (option) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break
                case 'View All Employees':
                    viewAllEmployees()
                    break;
                case 'Add A Department':
                    addADepartment()
                    break;
                case 'Add A Role':
                    addARoles()
                    break;
                case 'Add An Employee':
                    addAnEmployee()
                    break;
                case 'Update An Employee Role':
                    updateAnEmployeeRole()
                    break;
                case 'Quit':
                    db.end()
                    console.log('App ended!')
                    break;
            }

        })

};

const viewAllDepartments = () => {
    console.log(queries.selectAllDepartments)
    db.query(queries.selectAllDepartments, function (err, data) {
        if (err) { console.log('something went wrong, try again', err); return }
        console.table(data)
    })
};