const User = require('./models/userModel.js');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {
        const confirmationToken = await jwt.sign({email: req.body.email}, process.env.SECRET, { expiresIn: 300 });
        const userFound = await User.findOne({email: req.body.email});
        const newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            confirmationCode: confirmationToken,
            images: []
        });
        if (userFound) {
            return res.status(202).json({status: 'Usuário já existe'});
        }
        const userSaved = await newUser.save();
        await sendConfirmationEmail(userSaved.name, userSaved.email, userSaved.confirmationCode)
        return res.status(201).json({user: userSaved});
    } catch (err) {
        console.error(err);
    }
};
