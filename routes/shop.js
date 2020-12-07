const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//  PRODUCTS GET ROUTE
router.get('/', shopController.getIndex);

//  PRODUCTS GET ROUTE
router.get('/products', shopController.getProducts);

//  SPECIFIC PRODUCT GET ROUTE
router.get('/products/:productId', shopController.getProduct);

//  CART GET ROUTE
router.get('/cart', isAuth, shopController.getCart);

//  ORDERS GET ROUTE
router.get('/orders', isAuth, shopController.getOrders);

//  ORDER-DETAIL AND ORDER SUMMARY ROUTE
router.get('/orders/:orderId', isAuth, shopController.getInvoice);

//  ORDERS CHECKOUT ROUTE
router.get('/checkout', isAuth, shopController.getCheckout);

//  PAYMENT CONTINUE ROUTE
router.get('/checkout/success', shopController.postOrder);

// PAYMENT CANCEL ROUTE
router.get('/checkout/cancel', shopController.getCheckout)

// REMOVING PRODUCTS FROM CART ROUTE
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);


router.post('/cart', isAuth, shopController.postCart);

// router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;
