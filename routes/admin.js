var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

// ---------------------------------
// const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
router.use(cors());
process.env.SECRET_KEY = "secret";

// var condition = level ? {"admin" || "manager"}

router.route("/users").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/delete-user/:id").delete((req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.json("*** User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/register", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    level: req.body.level,
  };

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'admin@gmail.com',
      pass: '-----'
    }
  });

  var mailOptions = {
    from: 'ashimikathri@gmail.com',
    to: req.body.email,
    subject: 'Admin has created a new account for you.',
    text: 'Welcome to Company. ' +
        'Dear Manager your account username is ' + req.body.email + ' and the password is ' + req.body.password
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "registered" });
            })
            .catch((err) => {
              res.send("error" + err);
            });
        });
      } else {
        res.json({ error: "User already registered" });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exists in the system" });
        }
      } else {
        res.json({ error: "User does not exists in the system" });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

// module.exports = users;
// ----------------------------------

let Product = require("../models/product");

// get log user
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

// update product using id
router.route("/update-product/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;

      product
        .save()
        .then(() => res.json("*** Product updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/add-product").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const imagePath = req.body.imagePath;

  if (!description || !title) {
    return res
      .status(422)
      .json({ error: "You must enter description & title." });
  }

  if (!quantity) {
    return res.status(422).json({ error: "You must enter quantity." });
  }

  if (!price) {
    return res.status(422).json({ error: "You must enter price." });
  }

  const newProduct = new Product({
    title,
    description,
    price,
    quantity,
    imagePath,
  });

  newProduct
    .save()
    .then(() => res.json("*** Added new product"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/product/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error : " + err));
});

// delete product using id
router.route("/delete-product/:id").delete((req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(() => res.json("*** Product deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get products using get request and return json object
router.route("/product").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;

//test1
