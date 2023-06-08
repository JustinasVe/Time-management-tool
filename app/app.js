const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/calculations', (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM calculations WHERE userId=?', [userId], (err, calculations) => {
        res.send(calculations)
    });
});

app.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    connection.execute(
        'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
        [name, surname, email, hashedPassword],
        (err, result) => {
            res.sendStatus(200);
        }
    )
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Express server is runnig on PORT: ${PORT}`));