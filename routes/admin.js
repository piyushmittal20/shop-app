const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//  ADD-PRODUCT FORM GET ROUTE
router.get('/add-product', isAuth, adminController.getAddProduct);

//  GET ALL PRODUCTS ROUTE
router.get('/products', isAuth, adminController.getProducts);

//  ADD-PRODUCT POST ROUTE
router.post('/add-product',
    [
        body('title', 'Title must not be empty')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('price', 'Price must not be empty')
            .isFloat(),
        body('description', 'Description must not be empty')
            .isLength({ min: 5, max: 400 })
            .trim()
    ],
    isAuth,
    adminController.postAddProduct);

//  EDIT-PRODUCT FORM GET ROUTE
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

//  EDIT-PRODUCT POST ROUTE
router.post('/edit-product',
    [
        body('title', 'Title must not be empty')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('price', 'Price must not be empty')
            .isFloat(),
        body('description', 'Description must not be empty')
            .isLength({ min: 5, max: 400 })
            .trim()
    ],
    isAuth,
    adminController.postEditProduct);


//  DELETE PRODUCT ROUTE
router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;

