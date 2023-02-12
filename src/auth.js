const TempUser = require('./models/tempUserModel.js');
const User = require('./models/userModel.js');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('./mailService.js');
const AppHandler = require('./utils/AppHandler.js');

exports.signup = async (req, res) => {
    const tempUserFound = await TempUser.findOne({email: req.body.email});
    const userFound = await User.findOne({email: req.body.email});
    if (tempUserFound || userFound)
        throw new AppHandler(409, 'E-mail cadastrado');
    const confirmationToken = jwt.sign({email: req.body.email}, process.env.CONFIRMATION_SECRET, { expiresIn: 3600 });
    const newUser = new TempUser({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        confirmationCode: confirmationToken,
    });
    const userSaved = await newUser.save();
    const token  = jwt.sign({}, process.env.SECRET, {
        subject: userSaved._id.toString(),
        expiresIn: 60
    });
    const tokenSplit = token.split('.');
    res.cookie('APP_CREDENTIALS', `${tokenSplit[0]}.${tokenSplit[1]}`, {
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 1000 * 60 * 1,
        sameSite: 'strict'
    });
    res.cookie('APP_SIGNATURE', tokenSplit[2], {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        sameSite: 'strict'
    });
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
};