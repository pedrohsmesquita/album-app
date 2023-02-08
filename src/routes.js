const { signup } = require("./auth.js")

module.exports = (app) => {
    app.post('/auth/signup', signup)


}