const selectAllDepartments = 'SELECT * FROM department;'

const selectAllRoles = 'SELECT * FROM roles;'

const selectAllEmployees = 'SELECT * FROM employees;'

const addADepartment = (department) => {
    return `INSERT INTO department (dept_name) VALUES('${department}');`
 }; 

const sqlRoleAdd = (role, salary, role_department) => {
    return `INSERT INTO roles (title, salary, department_id) VALUES ('${role}', '${salary}', '${role_department}');`
}


module.exports = {
    selectAllDepartments,
    addADepartment,
    selectAllRoles,
    selectAllEmployees,
    sqlRoleAdd
}