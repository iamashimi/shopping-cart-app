var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Wishlist = require('../models/wish-list');
var Rating = require('../models/rating');
/* GET home page. */

router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg });
  });
});

router.get('/add-to-cart/:id', function (req,res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
      if(err){
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    });
});

router.get('/reduce/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function (req, res, next) {
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {product: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});


router.get('/checkout', isLoggedIn, function (req, res, next) {
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});


router.post('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  console.log('sending the email >>>');
  console.log(req.session.cart.totalPrice);
  console.log(req.body);
  var total = req.session.cart.totalPrice;
  var mailOptions = {
  from: 'shopping.cart.app.18@gmail.com',
  to: req.user.email,
  subject: 'Hi '+ req.body.name + ', your purchase successful !',
  html: '<div ><div >INVOICE TO:</div><h2 >'+ req.body.name +'</h2><div >'+req.body.address+'</div><div >'+req.user.email+'</div></div><div><h2 >INVOICE</h2><div >Total Price: $'+ total +'</div><div >Card Holder: '+ req.body.cardname+'</div><div >Card Number: '+ req.body.cardnumber+'</div><div >Date of Invoice: '+Date()+'</div></div></div><br/><div><b>Thank you!</b></div>'
};
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  var cart = new Cart(req.session.cart);
  var stripe = require('stripe')(
      'sk_test_n03wpz24VOmltiZGXHcy6m0r00DzVQyj2H'
  );
// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  stripe.charges.create(
      {
        amount: cart.totalPrice * 100,
        currency: 'usd',
        source: req.body.stripeToken,
        description: 'Product Charge',
      },
      function(err, charge) {
        if(err){
          req.flash('error', err.message);
          return res.redirect('/checkout');
        }
        var order = new Order({
          user: req.user,
          cart: cart,
          address: req.body.address,
          name: req.body.name,
          paymentId: charge.id
        });
        order.save(function (err, result) {
          req.flash('success', 'Purchased Successfully!');
          req.session.cart = null;
          res.render('shop/ratings', {userName: order.name})
        });
      });
});


router.get('/ratings', isLoggedIn, function (req, res, next) {

 
  var errMsg = req.flash('error')[0];
  res.render('shop/ratings');
});

router.get('/paymentMethod', isLoggedIn, function (req, res, next) {

 
  var errMsg = req.flash('error')[0];
  res.render('shop/paymentMethod');
});


router.get('/cashOnDelivery', isLoggedIn, function (req, res, next) {
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/cashOnDelivery', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/cashOnDelivery', isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  console.log('sending the email >>>');
  console.log(req.session.cart.totalPrice);
  console.log(req.body);
  var total = req.session.cart.totalPrice;
  var mailOptions = {
  from: 'shopping.cart.app.18@gmail.com',
  to: req.user.email,
  subject: 'Hi '+ req.body.name + ', your purchase successful !',
  html: '<div ><div >INVOICE TO:</div><h2 >'+ req.body.name +'</h2><div >'+req.body.address+'</div><div >'+req.user.email+'</div></div><div><h2 >INVOICE</h2><h2 >You should pay when the packeage is delivered </h2><div >Total Price: $'+ total +'</div><div > '+Date()+'</div></div></div><br/><div><b>Thank you!</b></div>'
 };
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  var cart = new Cart(req.session.cart);
  var stripe = require('stripe')(
      'sk_test_n03wpz24VOmltiZGXHcy6m0r00DzVQyj2H'
  );
// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  stripe.charges.create(
      {
        amount: cart.totalPrice * 100,
        currency: 'usd',
        source: req.body.stripeToken,
        description: 'Product Charge',
      },
      function(err, charge) {
        if(err){
         
         
        }
        var order = new Order({
          user: req.user,
          cart: cart,
          address: req.body.address,
          name: req.body.name,
          paymentId: 'Cash On Delivery'
        });
        order.save(function (err, result) {
          req.flash('success', 'Purchased Successfully!');
          req.session.cart = null;
          res.render('shop/ratings', {userName: order.name})
        });
      });
});


router.post('/submitRatings', isLoggedIn, function(req, res, next){
  console.log('submitting the ratings >>>');
  console.log(req.body);

  var stripe = require('stripe')(
      'sk_test_n03wpz24VOmltiZGXHcy6m0r00DzVQyj2H'
  );
// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  stripe.charges.create(
      {
        user: req.body.userName,
        rating: req.body.rating,
        comment: req.body.comment,
      },
      function(err, charge) {
        if(err){


        }
        var rating = new Rating({
          user: req.body.userName,
          rating: req.body.selected_rating,
          comment: req.body.ratingComment
        });
        rating.save(function (err, result) {
          req.flash('success', 'Rating Successful!');
          res.redirect('/');
        });
      });

});



router.get('/add-to-wish-list/:id', function (req,res, next) {
  var productId = req.params.id;
  var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});

  Product.findById(productId, function (err, product) {
    if(err){
      return res.redirect('/');
    }
    wishlist.add(product, product.id);
    req.session.wishlist = wishlist;
    console.log(req.session.wishlist);
    res.redirect('/');
  });
});

router.get('/wish-list', function (req, res, next) {
  if(!req.session.wishlist){
    return res.render('shop/wish-list', {product: null});
  }
  var wishlist = new Wishlist(req.session.wishlist);
  res.render('shop/wish-list', {products: wishlist.generateArray(), totalPrice: wishlist.totalPrice})
});

router.get('/removewishlist/:id', function (req, res, next) {
  var productId = req.params.id;
  var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});

  wishlist.removeItem(productId);
  req.session.wishlist = wishlist;
  res.redirect('/wish-list');
});



router.get('/home', function (req, res, next) {
  res.send('wiki home');
  console.log("home");
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}

//email part
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shopping.cart.app.18@gmail.com',
    pass: 'kavi25565@2'
  }
});


module.exports = router;
