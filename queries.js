const selectAllDepartments = 'SELECT * FROM department;'

const addADepartment = (department) => {
    return `INSERT INTO department (dept_name) VALUES('${department}');`
 }; 


module.exports = {
    selectAllDepartments,
    addADepartment
}