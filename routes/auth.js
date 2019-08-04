const router = require('express').Router();
const User = require('../models/User');
const {userRegisterValidation, userLoginValidation} = require('../http/Requests/userRequest');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/register', async (req, res) => {
    let userRequest = req.body;
    let validRequest = await userRegisterValidation(req, res);

    if (validRequest) {

        // generate salt for bcrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userRequest.password, salt);
        const user = new User({
            name: userRequest.name,
            email: userRequest.email,
            password: hashPassword,
        });

        try {
            const savedUser = await user.save();

            res.send(savedUser._id);
        } catch (e) {
            res.status(400).send(e)
        }
    }
});

router.post('/login', async (req, res) => {
     let user = await userLoginValidation(req, res);

     if (user) {
         let responseUserData = {
           id: user._id
         };

         const token = jwt.sign(responseUserData, process.env.JWT_SECRET);
         res.header('auth-token', token);
         return res.status(200).send('Logged in!');
     }

     res.status(400).send('Something went wrong! Please check creds or server.')
});

module.exports = router;