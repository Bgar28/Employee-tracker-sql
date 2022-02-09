require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const pkg = require('./package.json');
const queries = require('./queries');
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

// User is prompted with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role and quit.
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
                    addARole()
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
    db.query(queries.selectAllDepartments, function (err, data) {
        if (err) {
            console.log('Something went wrong, try again', err)
            return
        }
        console.table(data)
        start()
    })
};

const viewAllRoles = () => {
    db.query(queries.selectAllRoles, function (err, data) {
        if (err) {
            console.log('Something went wrong, try again', err)
            return
        }
        console.table(data)
        start()
    })
};

const viewAllEmployees = () => {
    db.query(queries.selectAllEmployees, function (err, data) {
        if (err) {
            console.log('Something went wrong, try again', err)
            return
        }
        console.table(data)
        start()
    })

};

// grab the user's input for a new department and add to the departments table
const addADepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the department you would like to add!',
            name: 'department'
        }
    ])
        .then(({ department }) => {
            db.query(queries.addADepartment(department), function (err, data) {
                if (err) {
                    console.log('Something went wrong, try again', err)
                    return
                }
                db.query('select * from department;', function (err, data) {
                    if (err) {
                        console.log('Something went wrong, try again', err)
                        return
                    }
                    viewAllDepartments()
                })
            })
        })
};

// grab the user's input for a new role, salary, and that respective department and add to the roles table via query
const addARole = () => {
    db.query('select * from department;', function (err, data) {
        if (err) {
            console.log('Something went wrong, try again', err)
            return
        }
        const departmentObj = data.map(({ dept_name, id }) => {
            return { name: dept_name, value: id }
        })

        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the name of the role you would like to add!',
                name: 'role'
            },
            {
                type: "input",
                message: "What is the salary of this role?",
                name: "salary"
            },
            {
                type: "list",
                message: "Which department does this role belong to?",
                name: "role_department",
                choices: departmentObj
            }

        ])
            .then(roleResponses => {
                db.query(queries.sqlRoleAdd(roleResponses.role, Number(roleResponses.salary), roleResponses.role_department), function (err, data) {
                    if (err) {
                        console.log('Something went wrong, try again', err)
                        return
                    }
                    viewAllRoles()
                })
            })
    })

};

// grab the user's input for a new employee of first/last name, role and their respective manager and add to the employees table via query
const addAnEmployee = () => {
    db.query('select id, title from roles;', function (err, data) {
        if (err) {
            console.log('Something went wrong, try again', err)
            return
        }
        const rolesObj = data.map(({ title, id }) => {
            return { name: title, value: id }
        })

        db.query('select id, first_name, last_name from employees;', function (err, data) {
            if (err) {
                console.log('Something went wrong, try again', err)
                return
            }
            const employeesObj = data.map(({ first_name, last_name, id }) => {
                return { name: `${first_name} ${last_name}`, value: id }
            })

            const noManagerObj = {
                name: "None", value: 0 
            }

            employeesObj.push(noManagerObj)



            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "what is the employee's last name?",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    name: "employee_role",
                    choices: rolesObj
                },
                {
                    type: "list",
                    message: "Who is the employee's manager?",
                    name: "employee_manager",
                    choices: employeesObj
                },
            ])
                .then(employeeResponses => {
                    db.query(queries.sqlEmployeeAdd(employeeResponses.first_name, employeeResponses.last_name, employeeResponses.employee_role, employeeResponses.employee_manager)), function (err, data) {
                        if (err) {
                            console.log('Something went wrong, try again', err)
                            return
                        }
                    }
                    viewAllEmployees()
                })
        })
    })
}

// grab the selected employee and their role id to update their role via query with the users input
const updateAnEmployeeRole = () => {
    db.query('select id, first_name, last_name from employees;', function (err, data) {
        if (err) {
            console.log('Something went wrong, try again', err)
            return
        }
        const employeesObj = data.map(({ first_name, last_name, id }) => {
            return { name: `${first_name} ${last_name}`, value: id }
        })

        db.query('select id, title from roles;', function (err, data) {
            if (err) {
                console.log('Something went wrong, try again', err)
                return
            }
            const rolesObj = data.map(({ title, id }) => {
                return { name: title, value: id }
            })
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    name: "target_employee",
                    choices: employeesObj
                },
                {
                    type: "list",
                    message: "What is the new role of this employee?",
                    name: "new_role",
                    choices: rolesObj
                }
            ])
            .then( answers => {
                db.query(queries.updateEmployeeRole(answers.target_employee, answers.new_role), function (err, data) {
                    if (err) {
                        console.log('Something went wrong, try again', err)
                        return
                    }
                    viewAllEmployees()
                })
            })

        })



    })
}