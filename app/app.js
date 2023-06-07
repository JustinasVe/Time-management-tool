const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MY_HOST,
    user: process.env.MY_USER,
    password: process.env.MY_PASSWORD,
    database: process.env.MY_DATABASE,
    port: process.env.MY_PORT
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/calculations', (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM calculations WHERE userId=?', [userId], (err, calculations) => {
        res.send(calculations)
    });
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Express server is runnig on PORT: ${PORT}`));