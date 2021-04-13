const inquirer = require('inquirer');
const connection = require('../connection/connection');
const app = require('../app');

const addEmployee = () => {
    const query1 = 'SELECT id, title FROM role';
    const query2 = 'SELECT id, first_name, last_name FROM employee WHERE manager_id != role_id';
    var roleChoices = [];
    var managerChoices = [];

    connection.query(query1, (err, res) => {
        if (err) throw err;
        roleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
        connection.query(query2, (err, res) => {
            if (err) throw err;
            managerChoices = res.map(({ id, first_name, last_name }) => ({
                name: [first_name + ' ' + last_name],
                value: id,
            }));
            addEmployeeHelper(roleChoices, managerChoices);
        });
    });
};

const addEmployeeHelper = (roleChoices, managerChoices) => {
    inquirer.prompt(
        [
            {
                name: 'first_name',
                type: 'input',
                message: "Enter employee's first name?",
            },
            {
                name: 'last_name',
                type: 'input',
                message: "Enter employee's last name?",
            },
            {
                name: 'role',
                type: 'list',
                message: "Select employee's role?",
                choices: roleChoices
            },
            {
                name: 'manager',
                type: 'list',
                message: "Choose employee's manager?",
                choices: managerChoices
            }
        ]
    )
        .then((res) => {
            //console.log('Inserting new employee...\n');
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: res.first_name,
                    last_name: res.last_name,
                    role_id: res.role,
                    manager_id: res.manager
                },
                function (err, res) {
                    if (err) throw err;
                    const promise1 = new Promise((resolve, reject) => {
                        console.log(res.affectedRows + " employee added!\n");
                        resolve('Success!');
                    });
                    promise1.then(() => {
                        app.init();
                    });
                }
            );
        });
};

const addDepartment = () => {
    inquirer
        .prompt(
            [
                {
                    name: 'department',
                    type: 'input',
                    message: "Enter the name of the department?",
                }
            ]
        )
        .then((res) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: res.department
                },
                function (err, res) {
                    if (err) throw err;
                    const promise1 = new Promise((resolve, reject) => {
                        console.log(res.affectedRows + " department added!\n");
                        resolve('Success!');
                    });
                    promise1.then(() => {
                        app.init();
                    });
                }
            );
        });
};

const addRole = () => {
    const query = 'SELECT id, name FROM department';
    var depChoices = [];

    connection.query(query, (err, res) => {
        if (err) throw err;
        depChoices = res.map(({ id, name }) => ({
            value: id,
            name: name,
        }));
        addRoleHelper(depChoices);
    });
    
};

const addRoleHelper = (depChoices) => {
    inquirer
    .prompt(
        [
            {
                name: 'role',
                type: 'input',
                message: "What is the name of the role?",
            },
            {
                name: 'salary',
                type: 'number',
                message: "Please enter employees salary?",
            },
            {
                name: 'department',
                type: 'list',
                message: "What department is this emplyee under?",
                choices: depChoices
            }
        ]
    )
    .then((res) => {
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: res.role,
                salary: res.salary,
                department_id: res.department,
            },
            function (err, res) {
                if (err) throw err;
                const promise1 = new Promise((resolve, reject) => {
                    console.log(res.affectedRows + " role added!\n");
                    resolve('Success!');
                });
                promise1.then(() => {
                    app.init();
                });
            }
        );
    });
};


module.exports = {
    addEmployee,
    addDepartment,
    addRole,
};