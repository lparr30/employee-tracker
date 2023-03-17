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
                name: "role"
            }
        ])
        .then((reply) => {
            const role = reply.role
            db.query('INSERT INTO role (titleL VALUES (?);', [role], function(err, results) {
                if(err) {
                    throw err;
                }
            });
        })
    }
})}

init()


app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`)
});
