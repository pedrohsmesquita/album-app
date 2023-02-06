require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Teste para checar a conexão com front end e back end
app.post('/api/login', (req, res) => {
    console.log(req.body.email, req.body.password);
    res.send('Hello world!');
});

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is listening.");
});