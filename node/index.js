const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config)
  
const createTable  = `CREATE TABLE IF NOT EXISTS nodedb.people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);`
connection.query(createTable);

app.get('/', async (req,res) => {
    const RANDOM = Math.floor(Math.random() * 10);

    const sql = `INSERT INTO people(name) values('Josemar ${RANDOM}')`
    connection.query(sql)

    let tableUsers = '<table><thead><tr><th>#</th><th>Name</th></tr></thead><tbody>';

    const getUsers = `SELECT id, name FROM people`;
    connection.query(getUsers, (error, results, fields) => {
        if (error) {
            throw error
        };

        for(let people of results) {  
            tableUsers += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
        };


        tableUsers += '</tbody></table>';

        res.send('<h1>Full Cycle Rocks! </h1><br/>'+ tableUsers)
    });

    connection.end()
    
})

app.listen(port, () => {
    console.log('Rodando na porta '+port)
})