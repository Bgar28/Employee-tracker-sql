const selectAllDepartments = 'SELECT * FROM department;'

const selectAllRoles = 'SELECT * FROM roles;'

const addADepartment = (department) => {
    return `INSERT INTO department (dept_name) VALUES('${department}');`
 }; 

const selectAllEmployees = 'SELECT * FROM employees;'

module.exports = {
    selectAllDepartments,
    addADepartment,
    selectAllRoles,
    selectAllEmployees
}