const User = require('./models/userModel.js');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('./mailService.js');

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

exports.verifyUser = async (req, res, next) => {
    try {
        const user = await User.findOne({confirmationCode: req.params.confirmationCode});
        if (!user) {
            return res.status(404).send({message: 'Usuário não encontrado.'});
        }
        user.status = 'Active';
        user.confirmationCode = '';
        await user.save();
        // const test = await user.save(); 
        // res.status(200).json({user: test});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: err});
    }
}