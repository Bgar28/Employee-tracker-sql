const selectAllDepartments = 'SELECT * FROM department;'

const selectAllRoles = 'SELECT * FROM roles;'

const selectAllEmployees = 'SELECT employees.first_name, employees.last_name, roles.title, CONCAT(managers.first_name, " ", managers.last_name) AS managers_name FROM employees JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id ;'

const addADepartment = (department) => {
    return `INSERT INTO department (dept_name) VALUES('${department}');`
 }; 

const sqlRoleAdd = (role, salary, role_department) => {
    return `INSERT INTO roles (title, salary, department_id) VALUES ('${role}', '${salary}', '${role_department}');`
};

const sqlEmployeeAdd = (first_name, last_name, employee_role, employee_manager) => {
    return `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${employee_role}', '${employee_manager}');`
};

// UPDATE employees SET role_id WHERE first_name last_name
const updateEmployeeRole = (target_employee, new_role) => {
    return `UPDATE employees SET role_id = ${new_role} WHERE id = ${target_employee};`
}


module.exports = {
    selectAllDepartments,
    addADepartment,
    selectAllRoles,
    selectAllEmployees,
    sqlRoleAdd,
    sqlEmployeeAdd,
    updateEmployeeRole
}