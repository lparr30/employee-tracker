// import and require
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = expess();

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

// ROUTES

app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`)
});
