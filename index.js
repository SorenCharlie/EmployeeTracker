const inquirer = require('inquirer');
const { Pool } = require('pg');
let db

async function connectdb() {
    const pool = new Pool(
        {
            // Enter PostgreSQL username
            user: 'postgres',
            // Enter PostgreSQL password
            password: 'password',
            host: 'localhost',
            database: 'employeetracker_db'
        },
        console.log('Connected to the employeetracker_db database!')
    )
    db = await pool.connect();
    startApp()
}

function startApp() {
    inquirer.prompt({
        type: 'rawlist',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then(response => {
        switch (response.action) {
            // create cases
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee':
                updateEmployee();
                break;
            // close database connection
            case 'Exit':
                client.end();
                break;
        }
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp(); // Return to main menu
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp();
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department?"
        }
    ])
        .then(({ name }) => {
            const query = 'INSERT INTO department (name) VALUES ($1)';
            const values = [name];

            db.query(query, values, (err, res) => {
                if (err) {
                    console.error('Error adding department:', err);
                    return; // Exit the function on error
                }
                console.log('Department added successfully:', name);
                startApp(); // Return to the main menu
            });
        })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id of the new role?"
        }
    ])
        .then(({ title, salary, department_id }) => {
            const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
            const values = [title, salary, department_id];

            db.query(query, values, (err, res) => {
                if (err) {
                    console.error('Error adding role:', err);
                    return;
                }
                console.log('Role added successfully:', title);
                startApp();
            });
        })
    }

function addEmployee(employeesName) {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the new employee?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the new employee?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role id of the new employee?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager id of the new employee?"
        },
    ])
        .then(({ first_name, last_name, role_id, manager_id }) => {
                const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
                const values = [first_name, last_name, role_id, (manager_id == "") ? null : manager_id];

                db.query(query, values, (err, res) => {
                    if (err) {
                        console.error('Error adding employee information:', err);
                        return;
                    }
                    console.log('Employee information added successfully:');
                    startApp();
           });
        })
    }
    

connectdb();