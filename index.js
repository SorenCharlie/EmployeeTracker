const inquirer = require('inquirer');
const db = require('./db');

function startApp() {
    inquirer.prompt({
        type: 'list',
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
                addDepartments();
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
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp(); // Return to main menu
    });
}

function viewRoles() {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp(); 
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        startApp(); 
    });
}

function addDepartments(departmentsName) {
    const query = 'INSERT INTO departments (name) VALUES ($1)'; 
    const values = [departmentsName];

    db.query(query, values, (err, res) => {
        if (err) {
            console.error('Error adding department:', err);
            return; // Exit the function on error
        }
        console.log('Department added successfully:', departmentsName);
        startApp(); // Return to the main menu
    });
}

function addRole(rolesTitle) {
    const query = 'INSERT INTO role (title) VALUES ($1)'; 
    const values = [rolesTitle];

    db.query(query, values, (err, res) => {
        if (err) {
            console.error('Error adding role:', err);
            return;
        }
        console.log('Role added successfully:', roleName);
        startApp(); 
    });
}

function addEmployee(employeesName) {
    const query = 'INSERT INTO employees (first_name, last_name) VALUES ($1)'; 
    const values = [employeesName];

    db.query(query, values, (err, res) => {
        if (err) {
            console.error('Error adding employee name:', err);
            return; 
        }
        console.log('Employee name added successfully:', employeesName);
        startApp(); 
    });
}

