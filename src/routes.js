const { signup, verifyUser } = require("./auth.js")

module.exports = (app) => {
    app.post('/auth/signup', signup)

    app.get('/auth/signup/confirm/:confirmationCode', verifyUser);
}