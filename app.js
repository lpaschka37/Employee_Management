const connection = require('./config/connection');
const inquirer = require('inquirer');
const create = require('./lib/create');
const read = require('./lib/read');
const update = require('./lib/update');
// const delete = require('./lib/delete');

// Create the connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`
    ________                          __                                         
   /        |                        /  |                                        
   $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______  
   $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \ 
   $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |
   $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |
   $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/ 
   $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |
   $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/ 
                           $$ |                    /  \__$$ |                    
                           $$ |                    $$    $$/                     
                           $$/                      $$$$$$/                      
    ________                            __                                       
   /        |                          /  |                                      
   $$$$$$$$/______   ______    _______ $$ |   __   ______    ______              
      $$ | /      \ /      \  /       |$$ |  /  | /      \  /      \             
      $$ |/$$$$$$  |$$$$$$  |/$$$$$$$/ $$ |_/$$/ /$$$$$$  |/$$$$$$  |            
      $$ |$$ |  $$/ /    $$ |$$ |      $$   $$<  $$    $$ |$$ |  $$/             
      $$ |$$ |     /$$$$$$$ |$$ \_____ $$$$$$  \ $$$$$$$$/ $$ |                  
      $$ |$$ |     $$    $$ |$$       |$$ | $$  |$$       |$$ |                  
      $$/ $$/       $$$$$$$/  $$$$$$$/ $$/   $$/  $$$$$$$/ $$/                   
                                                                                 
                                                                                 
                                                                                 
   `);
    
   //call init
   init();
});

// Initialize the application
const init = () => {
    // Prompt user for input response
    inquirer
        .prompt({
            name: 'menu',
            type: 'list',
            message: 'Please select from one of the options below.',
            choices: [
                'View All Departments',
                'View All Employees',
                'View All Roles',
                'View All Employees By Department',
                'Add Department', 
                'Add Employee',
                'Add Role',
                'Exit' //Done
            ],
        })
        // depeneding on the response, call the corresponding helper function to execute the query
        .then((res) => {
            switch (res.menu) {
                case ('View All Departments'):
                    read.viewAllDepartments();
                    break;
                case ('View All Employees'):
                    read.viewAllEmployees();
                    break;
                case ('View All Roles'):
                    read.viewAllRoles();
                    break;
                case ('View All Employees By Department'):
                    read.viewAllEmployeesByDepartment();
                    break;
                case ('View All Employees By Role'):
                    read.viewAllEmployeesByManager();
                    break;
                case ('Add Department'):
                    create.addDepartment();
                    break;
                case ('Add Employee'):
                    create.addEmployee();
                    break;
                case ('Add Role'):
                    create.addRole();
                    break;
                case ('Update Employee Role'):
                    update.updateEmployeeRole();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log(`Something went wrong: ${res.menu}`);
                    break;
            }
        });
};

exports.init = init;