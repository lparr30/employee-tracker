// import and require
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'training',
        database: 'company_db'
    }
)

// PROMPTING QUESTIONS
const init = () => {
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "task",
        choices: [ "View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role" ]
    }
])

.then((response) => {
    const task = response.task;
    if (task === "View all departments"){
        db.query('SELECT * FROM department;', function(err, results) {
            console.table(results);
        });
    }
    else if(task === "View all roles"){
        db.query('SELECT * FROM role;', function (err, results) {
            console.table(results);
        });
    }
    else if(task === "View all employees"){
        db.query('SELECT * FROM employee;', function (err, results) {
            console.table(results);
        });
    }
    else if(task === "Add a department"){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "department"
            }
        ])
        .then((answer) => {
            const department = answer.department
            db.query('INSERT INTO department (name) VALUES (?);', [department], function(err, results) {
                if(err) {
                    throw err;
                }
            });
            db.query('SELECT * FROM department;', function (err, results) {
                console.table(results);
            });
        })
    }
    else if(task === "Add a role"){
        inquirer.prompt([
            {
                type:"input",
                message: "What is the title of the role?",
                name: "role-title"
            },
            {
                type:"input",
                message: "What is the salary of the role?",
                name: "role-salary"
            }, 
            {
                type:"list",
                message: "What department does your role belong to?",
                name: "role-dept",
                choices: ["Boss, 1", "R & D, 2", "Science, 3", "HR, 4", "Reception, 5"]
            }
        ])
        .then((reply) => {
            const title = reply['role-title']
            const salary = reply['role-salary']
            const department_ID = reply['role-dept'].split(', ')[1]
            db.query('INSERT INTO role SET ?', {title, salary, department_ID, function(err, results) {
                if (err) {
                    throw err;
                }
            }})
            db.query('SELECT * FROM role;', function (err, results) {
                console.table(results);
            });
        })
    } else if(task === "Add an employee"){
        inquirer.prompt([
            {
                type:"input",
                message: "What is the employee's first name?",
                name: "first_name"
            },
            {
                type:"input",
                message: "What is the employee's last name?",
                name: "last_name"
            }, 
            {
                type:"list",
                message: "What is your employee's role?",
                name: "role_id",
                choices: ["CEO, 1", "Inventor, 2", "Lab Tech, 3", "Talent Acquisition, 4", "Receptionist, 5"]
            },
            {
                type:"list",
                message: "Who is your employee's manager?",
                name: "manager_id",
                choices: ["Trixie Mattel, 1", "Santa Claus, 2"]
            }
        ])
        .then((reply) => {
            const first_name = reply.first_name
            const last_name = reply.last_name
            const role_id = reply.role_id.split(', ')[1]
            const manager_id = reply.manager_id.split(', ')[1]
            db.query('INSERT INTO employee SET ?', {first_name, last_name, role_id, manager_id, function(err, results) {
                if (err) {
                    throw err;
                }
            }})
            db.query('SELECT * FROM employee;', function (err, results) {
                console.table(results);
            });
        })
    } else if(task === "Update an employee role") {
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee do you want to update the role for?",
                name: "id",
                choices: ["Trixie Mattel, 1", "Santa Clause, 2", "Bill Nye, 3", "Jenna Marbles, 4", "Fran Fine, 5"]
            },
            {
                type: "list",
                message: "What is the new role?",
                name: "role_id",
                choices: ["CEO, 1", "Inventor, 2", "Lab Tech, 3", "Talent Acquisition, 4", "Receptionist, 5"]
            }
        ])
        .then((reply) => {
            const id = reply.id.split(', ')[1]
            const role_id = reply.role_id.split(', ')[1]
            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, id], function(err, results) {
                if (err) {
                    throw err;
                }
            })
            db.query('SELECT * FROM employee;', function (err, results) {
                console.table(results);
            });
        })
    }
})}

init()


app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`)
});
