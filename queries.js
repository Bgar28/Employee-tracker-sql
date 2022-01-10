const selectAllDepartments = 'SELECT * FROM department;'

const addADepartment = (department) => {
    return `INSERT INTO department (dept_name) VALUES('${department}');`
 }; 

const selectAllRoles = 'SELECT * FROM roles;'


module.exports = {
    selectAllDepartments,
    addADepartment,
    selectAllRoles
}