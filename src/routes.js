const { signup, verifyUser, login, ensureAuthentication } = require("./auth.js");
const { tryCatch } = require("./utils/tryCatch.js");

module.exports = (app) => {
    app.post('/auth/signup', tryCatch(signup));

    app.post('/auth/signup/confirm/:confirmationCode', tryCatch(verifyUser));

    app.post('/auth/login', tryCatch(login));

    app.post('/auth/token', tryCatch(ensureAuthentication));
}