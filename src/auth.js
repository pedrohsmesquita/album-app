const TempUser = require('./models/tempUserModel.js');
const User = require('./models/userModel.js');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('./mailService.js');
const AppHandler = require('./utils/AppHandler.js');

exports.signup = async (req, res) => {
    const confirmationToken = await jwt.sign({email: req.body.email}, process.env.SECRET, { expiresIn: 3600 });
    const tempUserFound = await TempUser.findOne({email: req.body.email});
    const userFound = await User.findOne({email: req.body.email});
    const newUser = new TempUser({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        confirmationCode: confirmationToken,
    });
    if (tempUserFound || userFound)
        throw new AppHandler(409, 'E-mail cadastrado');
    const userSaved = await newUser.save();
    await sendConfirmationEmail(userSaved.name, userSaved.email, userSaved.confirmationCode);
    return res.status(201).json({message: 'Usuário cadastrado com sucesso'});
};

exports.verifyUser = async (req, res) => {
    const tempUser = await TempUser.findOne({confirmationCode: req.params.confirmationCode});
    if (!tempUser)
        throw new AppHandler(404, 'Conta ou token não encontrado');
    const newUser = new User({
        email: tempUser.email,
        name: tempUser.name,
        password: tempUser.password,
        isActive: true,
        images: [],
        createdAt: tempUser.createdAt
    });
    const user = await newUser.save();
    await tempUser.delete();
    return res.status(200).json({message: 'E-mail confirmado'});
}