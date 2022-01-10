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
       ("Klay", "Thompson", 5, null)