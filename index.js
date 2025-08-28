const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');

const port = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let newUser = await userModel.create({
                username,
                email,
                password: hash,
                age,
            });

            let token = jwt.sign({ email }, "shhhhhhhhhh");
            res.cookie('token', token);
            res.send(newUser);
        });
    });

});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});





app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})