const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')

const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("working")
})

app.get('/read', (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
})

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})