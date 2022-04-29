const User = require("../models/user.model");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Failed",
                errors: errors.array()
            })
        }

        const {fullName, email, userName, contactNumber, userType, password} = req.body;
    
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            fullName: fullName,
            email: email,
            userName: userName,
            contactNumber: contactNumber,
            userType: userType,
            password: hashedPwd
        });

        await newUser.save();

        res.status(201).send({
            success: true,
            data: newUser,
            message: "User Created"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Failed",
                errors: errors.array()
            })
        }

        const {email, password} = req.body;

        let user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Failed",
                errors: 'Invalid Credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Failed",
                errors: 'Invalid Credentials'
            });
        }

        const payload = {
            user: {
                userType: user.userType,
                email: user.email,
                id: user._id,
                fullName: user.fullName
            }
        };

        jwt.sign(
            payload,
            "polibackendkey",
            (err, token) => {
                if (err) throw err;

                return res.status(200).json({
                    success: true,
                    message: "Signed In",
                    token: token,
                    user: {
                        fullName: user.fullName,
                        email: user.email,
                        userType: user.userType,
                        contactNumber: user.contactNumber
                    }
                })
            }
        );
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.GetAllUsers = async (req, res) => {
    // console.log(req.user);
    // res.status(200).send("Get all users");
    try {
        let users = await User.find({});

        res.status(200).send({
            success: true,
            data: users,
            message: "All users"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getCollectors = async (req, res) => {
    try {
        let us = await User.find({});

        let filus = us.filter(i => {
            if(i.userType.toLowerCase() == "collector") {
                return true;
            }
            else {
                return false;
            }
        })

        res.status(200).send({
            success: true,
            data: filus,
            message: "All Collectors"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        // console.log(req.user);

        let password = generateString(8);

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        let pwdUpdated = await User.findOneAndUpdate({_id: req?.user?.id}, {
            password: hashedPwd
        }); 

        res.status(200).send({
            success: true,
            data: password,
            message: "Password Changed!"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

exports.validate = (method) => {
    switch (method) {
        case "createUser": {
            return [
                check('fullName', 'Full Name is required!').exists(),
                check('email', 'Email is required!').exists().isEmail(),
                check('userName', 'UserName is required!').exists(),
                check('contactNumber', 'Contact Number is required!').exists(),
                check('userType', 'User Type is required!').exists(),
                check('password', 'password is required').exists(),
            ]
        }
        case "login": {
            return [
                check('email', 'Email is required!').exists().isEmail(),
                check('password', 'password is required').exists(),
            ]
        }
    }
}