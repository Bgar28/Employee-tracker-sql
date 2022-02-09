# Employee-tracker-sql
 ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
 ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
 ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
  
  ## Description 
  
  This is a command-line application that utilizes MySQL to manage a company's employee's database as a content management system (CMS).
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
   
  ## Installation

Clone this repository and install the depencies by running: <br>
```
npm install
```
Then create the database by running the schema.sql and give it employee information by running seeds.sql file inside of your SQL terminal.

```
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INT, 
    CONSTRAINT fk_employee FOREIGN KEY (manager_id) REFERENCES employees(id) 
);
```
```
INSERT INTO department (dept_name)
VALUES ("Purchasing"),
       ("Human Resources"),
       ("Sales"),
       ("IT");
 

INSERT INTO roles (title, salary, department_id)
VALUES ("HR Manager", 75000, 2),
       ("Procurement Analyst", 63000, 1),
       ("Software Engineer", 90000, 4),
       ("Account Executive", 83000, 3), 
       ("System Administrator", 95000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kobe", "Bryant", 4, null),
       ("Lebron", "James", 3, null),
       ("Allen", "Iverson", 2, null),
       ("Steph", "Curry", 1, null), 
       ("Klay", "Thompson", 5, null);
```
Once the database is created, you can start the application by running:
```
node index.js
```
  ## Usage

  This application utilizes Node.js, Inquirer and MySQL. Below, I have added screenshots of when the user selects the options of "View All Departments", "View All Roles", and "View All Employees". <br/>
  ![screenshot](https://github.com/Bgar28/Note-taker/blob/main/public/assets/screenshot1.png) <br/>
  ![screenshot](https://github.com/Bgar28/Note-taker/blob/main/public/assets/screenshot2.png) <br/>
  ![screenshot](https://github.com/Bgar28/Note-taker/blob/main/public/assets/screenshot3.png)


  ## License
  ![MIT](https://img.shields.io/badge/License-MIT-yellow.svg) Licensed under MIT.

  

  ## Questions?

  Any questions or concerns, please contact me via the information provided below:

  Github: Bgar28 <br/> https://github.com/Bgar28/ <br/>
  ![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

  Or

  Email: briangarlandk@gmail.com <br/>
  ![GMAIL](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)