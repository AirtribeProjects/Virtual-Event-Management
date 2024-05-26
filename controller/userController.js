const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidator = require('../Utils/userValidator');
const { readDataFromFile } = require('../Utils/utils');
const { registerUser } = require('../service/userService')
const userData = './DB/user.json'
require('dotenv').config();

// Controller functions for user related actions

const userController = {

    /**
        * Registers a new user with the provided username, email, and password.
    */
    registerUser: async (req, res) => {
        try {
            const userInfo = req.body;
            if (userValidator.validateUserDetails(userInfo).status == true) {
                const users = await readDataFromFile(userData);
                // Check if user already exists
                if (userValidator.isUserExists(users, userInfo)) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                await registerUser(userInfo, users);
                res.status(201).json({ message: 'User registered successfully' });
            } else {
                let message = Validator.validateUserDetails(userDetails).message;
                return res.status(400).send(message);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error occured while user creation' + error });
        }

    },

    /*
        Logs in user with the provided correct username and password.
    */
    loginUser: async (req, res) => {
        try {
            const userInfo = req.body;
            if (Validator.validateLoginDetails(req.body).status == true) {
                // check if user present
                const users = await readDataFromFile(userData);
                const user = userValidator.isUserExists(users, userInfo);
                if (!user) {
                    return res.status(401).json({ message: 'Invalid user' });
                }
                // Check password
                const isPasswordValid = bcrypt.compareSync(userInfo.password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                // Generate JWT token
                const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);
                res.status(200).json({ userId: user.userId, token });
            } else {
                let message = userValidator.validateLoginDetails(req.body).message;
                return res.status(400).send(message);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error occured user login' + error });
        }
    }
};

module.exports = userController;