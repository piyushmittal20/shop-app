// AUTHENTICATION ROUTES //

const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

//  LOGIN FORM GET ROUTE
router.get('/login', authController.getLogin);

// SIGNUP FORM GET ROUTE
router.get('/signup', authController.getSignup);

// LOGIN POST ROUTE
router.post('/login',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .normalizeEmail(),
        body(
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin);

//  SIGNUP POST ROUTE
router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                // if (value === 'Test@test.com') {
                //     throw new Error('This email address is forbidden.')
                // }
                // return true;
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'E-Mail exists already, please pick a different one.'
                            )
                        }
                    })
            })
            .normalizeEmail(),
        body(
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match!');
                }
                return true;
            })
            .trim()

    ],
    authController.postSignup);

// LOGOUT POST ROUTE
router.post('/logout', authController.postLogout);

// PASSWORD RESET GET ROUTE
router.get('/reset', authController.getReset);

//  PASSWORD RESET POST ROUTE
router.post('/reset', authController.postReset);

//  NEW-PASSWORD SETUP GET ROUTE
router.get('/reset/:token', authController.getNewPassword);

// NEW-PASSWORD SETUP POST ROUTE
router.post('/new-password', authController.postNewPassword);

module.exports = router;
