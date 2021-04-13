const inquirer = require('inquirer');
const connection = require('../connection/connection');
const app = require('../app');

// 'View All Employees',
const viewAllEmployees = () => {
    const query =
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM role INNER JOIN employee ON role.id = employee.role_id INNER JOIN department ON role.department_id = department.id;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

// 'View All Roles',
const viewAllRoles = () => {
    const query =
        'SELECT title FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

// 'View All Departments',
const viewAllDepartments = () => {
    const query =
        'SELECT name FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

// 'View All Employees By Department',
const viewAllEmployeesByDepartment = () => {
    const query = 'SELECT id, name FROM department';
    var depChoices = [];

    connection.query(query, (err, res) => {
        if (err) throw err;
        depChoices = res.map(({ id, name }) => ({
            id: id,
            value: name,
        }));
        viewEmployeeByDepartmentHelper(depChoices);
    });
};

const viewEmployeeByDepartmentHelper = (depChoices) => {
    inquirer
        .prompt({
            name: 'department',
            type: 'list',
            message: 'Select a Department?',
            choices: depChoices
        })
        .then((res) => {
            switch (res.department) {
                case ('Production'):
                    viewEmployeesInProduction();
                    break;
                case ('Research and Development'):
                    viewEmployeesInResearchAndDevelopment();
                    break;
                case ('Operations'):
                    viewEmployeesInOperations();
                    break;
                case ('Marketing'):
                    viewEmployeesInMarketing();
                    break;
                case ('Finance'):
                    viewEmployeesInFinance();
                    break;
                default:
                    console.log(`Something went wrong: ${res.depMenu}`);
                    break;
            }
        });
};

const viewEmployeesInProduction = () => {
    console.log("viewEmployeesInProduction function called");
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Production" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewEmployeesInResearchAndDevelopment = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Research and Development" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewEmployeesInOperations = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Operations" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewEmployeesInMarketing = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Marketing" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewEmployeesInFinance = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Finance" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

// 'View All Employees By Manager'
const viewAllEmployeesByManager = () => {
    const query1 = 'SELECT DISTINCT manager_id FROM employee;';
    //const query2 = 'SELECT ';
    var managerIDs = [];
    //var managerChoices = [];

    connection.query(query1, (err, res) => {
        if (err) throw err;
        managerIDs = res.map(({ id }) => ({
            value: id,
        }));
        console.log(managerIDs);
        viewEmployeeByManagerHelper(managerIDs);
    });
};

const viewEmployeeByManagerHelper = (managerIDs) => {
    inquirer
        .prompt({
            name: 'manager',
            type: 'list',
            message: 'Select a Manager?',
            choices: managerIDs
        })
        .then((res) => {
            const m = res.manager;
            m.forEach(manager => viewEmployee(manager));
        });
};

const viewEmployee = (manager) => {
    const query = 'SELECT * FROM employee WHERE manager_id = ' + manager;
    connection.query(query);  
};

// 'View All Employees By Role',


// 'View Department Budgets',
const viewUtilizedDepartmentBudgets = () => {
    inquirer
        .prompt({
            name: 'menu',
            type: 'list',
            message: 'Which utilized department budget would you like to view?',
            choices: [
                'Production',
                'Research and Development',
                'Operations',
                'Marketing',
                'Finance'
            ],
        })
        .then((res) => {
            switch (res.menu) {
                case ('Production'):
                    viewUtilizedProductionBudget();
                    break;
                case ('Research and Development'):
                    viewUtilizedResearchAndDevelopmentBudget();
                    break;
                case ('Operations'):
                    viewUtilizedOperationsBudget();
                    break;
                case ('Marketing'):
                    viewUtilizedMarketingBudget();
                    break;
                case ('Finance'):
                    viewUtilizedFinanceBudget();
                    break;
                default:
                    console.log(`Something went wrong: ${res.menu}`);
                    break;
            }
        });
};

const viewUtilizedProductionBudget = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Production" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewUtilizedResearchAndDevelopmentBudget = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Research and Development" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewUtilizedOperationsBudget = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Operations" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewUtilizedMarketingBudget = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Marketing" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};

const viewUtilizedFinanceBudget = () => {
    const query =
        'SELECT department.name, employee.first_name, employee.last_name FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.name = "Finance" ORDER BY department.name;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.init();
    });
};


module.exports = {
    viewAllEmployees,
    viewAllEmployeesByDepartment,
    viewAllEmployeesByManager,
    viewAllRoles,
    viewAllDepartments,
    viewUtilizedDepartmentBudgets,
};