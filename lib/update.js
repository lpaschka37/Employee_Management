const inquirer = require('inquirer');
const connection = require('../connection/connection');
const app = require('../app');

// query to get employees, roles, and then update an employee's role
function updateEmployeeRole() {
    const query1 = 'SELECT employee.id, first_name, last_name, role_id FROM employee;';
    const query2 = 'SELECT role.id, title FROM role';
    var emps = [];
    var titles = [];
    connection.query(query1, (err, res) => {
        if (err) throw err;
        emps = res.map(({ id, first_name, last_name, role_id }) => ({
            id: id,
            name: first_name + ' ' + last_name,
            role_id: role_id,
        }));
        //console.log(empList);
        connection.query(query2, (err, res) => {
            if(err) throw err;
            titles = res.map(({ id, title }) => ({
                role_id: id,
                title: title,
            }));
            //console.log(roleList);
            return updateEmployeeRoleHelper(emps, titles); 
        });
    });

}


// inquire for selected employee and new role
const updateEmployeeRoleHelper = (emps, titles) => {
    // console.log(emps);
    // console.log(titles);       
    inquirer
    .prompt(
        [
            {
                name: 'employee',
                type: 'list',
                message: 'Select an employee to update:',
                choices: emps,
            },
            {
                name: 'title',
                type: 'list',
                message: 'What is their new role:',
                choices: titles,
            }
        ]
    )
    .then((res) => {
        // console.log(res.employee, res.title);
        // console.log(res.employee.role_id);
        // console.log(res.titles.role_id);

        const query3 = connection.query(
            'UPDATE employee WHERE ? ',
            [   
                {
                       employee: res.employee
                },
                {
                       role_id: res.title.id
                }
            ],
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee updated!\n");
                app.init();
        });
    });
};

module.exports = {
    updateEmployeeRole
};