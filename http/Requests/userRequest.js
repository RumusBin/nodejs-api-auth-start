const Joi = require('@hapi/joi');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const registerRules = {
    name: Joi.string().max(255).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(6).required()
};

const loginRules = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
};

const userRegisterValidation = async (req, res) => {
    let request = req.body;
    const validated = Joi.validate(request, registerRules);

    if (validated.error) {
        let errorMessage = validated.error.details[0].message;
        return res.status(400).send(errorMessage)
    }

    const existsUser = await User.findOne({email: request.email});

    if (existsUser) {
        return res.status(400).send('User already exists')
    }

    return true;
}

const userLoginValidation = async (req, res) => {
    let errorMessage = 'Email or password dosnt exists';
    let request = req.body;
    const validated = Joi.validate(request, loginRules);

    if (validated.error) {
        let errorMessage = {
            type: validated.error.details[0].type,
            message: validated.error.details[0].message};
        return res.status(400).send(errorMessage)
    }

    const existsUser = await User.findOne({email: request.email});
    if (!existsUser) return res.status(400).send(errorMessage);

    let validPass = await bcrypt.compare(request.password, existsUser.password);

    if (!validPass) {
        return res.status(400).send(errorMessage);
    }

    return existsUser;
}


module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userLoginValidation = userLoginValidation;