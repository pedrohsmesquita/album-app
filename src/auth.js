const TempUser = require('./models/tempUserModel.js');
const User = require('./models/userModel.js');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('./mailService.js');
const AppHandler = require('./utils/AppHandler.js');

exports.signup = async (req, res) => {
    const tempUserFound = await TempUser.findOne({email: req.body.email});
    const userFound = await User.findOne({email: req.body.email});
    if (tempUserFound || userFound)
        throw new AppHandler(409, 'E-mail já cadastrado');
    const confirmationToken = jwt.sign({email: req.body.email}, process.env.CONFIRMATION_SECRET, { expiresIn: 3600 });
    const newUser = new TempUser({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        confirmationCode: confirmationToken,
    });
    await newUser.save();
    await sendConfirmationEmail(req.body.name, req.body.email, confirmationToken);
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
        profilePicture: '',
        createdAt: tempUser.createdAt
    });
    await newUser.save();
    await tempUser.delete();
    return res.status(200).json({message: 'E-mail confirmado'});
};

exports.login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user || !user.isValidPassword(req.body.password))
        throw new AppHandler(401, 'E-mail ou senha incorretos');
    const token = jwt.sign({}, process.env.SECRET, {
        subject: user._id.toString(),
        expiresIn: 3600 * 24
    });
    const tokenSplit = token.split('.');
    res.cookie('APP_CREDENTIALS', `${tokenSplit[0]}.${tokenSplit[1]}`, {
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 1000 * 60 * 30,
        sameSite: 'strict'
    });
    res.cookie('APP_SIGNATURE', tokenSplit[2], {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        sameSite: 'strict'
    });
    return res.status(200).json({message: 'Logado com sucesso', user: {name: user.name, profilePicture: user.profilePicture}});
};

exports.ensureAuthentication = async (req, res) => {
    const token = jwt.verify(`${req.cookies.APP_CREDENTIALS}.${req.cookies.APP_SIGNATURE}`,
                process.env.SECRET);
    res.cookie('APP_CREDENTIALS', req.cookies.APP_CREDENTIALS, {
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 1000 * 60 * 30,
        sameSite: 'strict'
    });
    return res.status(200).json({message: 'Logado com sucesso'});
};