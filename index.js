require('dotenv').config();
const express = require('express');
const mongo = require('./src/database.js');
const errorHandler = require('./src/middleware/errorHandler.js');
const routes = require('./src/routes.js')

const app = express();
mongo.init(app);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

routes(app);
app.use(errorHandler);

app.on('ready', () => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server is listening.");
    });
});