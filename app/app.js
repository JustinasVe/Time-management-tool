const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch(e) {
        res.send({ error: 'Invalid Token'});
    }
}

app.get('/calculations', verifyToken, (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM calculations WHERE userId=?', [userId], (err, calculations) => {
        res.send(calculations)
    });
});

app.post('/calculations', verifyToken, (req, res) => {
    const { projectHours, deadline, commitments, maxDailyHours, userId } = req.body;
    connection.execute(
        'INSERT INTO calculations (projectHours, deadline, commitments, maxDailyHours, userId) VALUES (?, ?, ?, ?, ?)',
        [projectHours, deadline, commitments, maxDailyHours, userId],
        () => {
            connection.execute(
                'SELECT * FROM calculations WHERE userId=?',
                [userId],
                (err, calculations) => {
                    res.send(calculations);
                }
            )
        }
    )
});

app.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    connection.execute(
        'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
        [name, surname, email, hashedPassword],
        (err, result) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }
            res.send(result);
        }
    )
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [email],
        (err, result) => {
            if (result.length === 0) {
                res.sendStatus(401);
            } else {
                const passwordHash = result[0].password
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    const { id, email } = result[0];
                    const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, { expiresIn: '5d'});
                    res.send({ token, id, email });
                } else {
                    res.sendStatus(401);
                }
            }
        }
    )
});

app.get('/token/verify', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.send(user);
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Express server is runnig on PORT: ${PORT}`));