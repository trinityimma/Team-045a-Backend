const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const saltrounds = 10;
let errors;
let user;


exports.home = (req, res) => {
    res.send("Hello 👋 Welcome to Team-045a-Backend!");
};

exports.getRegister = (req, res)=>{
  res.render('register', {title: "Register"});
};

exports.postRegister = [

    body('firstName', 'first name cannot be less than one and must contain alphanumeric characters').isLength({min: 3})
    .isAlphanumeric().trim(),
    body('lastName', 'Email name cannot be less than one and must contain alphanumeric characters').isLength({min: 3})
    .isAlphanumeric().trim(),
    body('email', 'Must be a valid email').isEmail(),
    body('password', 'Password must not be less than 8 characters').isLength({min: 8}),
    body('passwordMatch').custom((value, {req})=>{
       if(value !== req.body.password){
       	throw new Error('Password confirmation does not match');
       }
       return true;
    }),

    //procesing the request
    (req, res)=>{

	   errors = validationResult(req);
    if (!errors.isEmpty()){
    	res.status(403).json({message: "Validation failed, please register again"});
    }else{
          const {firstName, lastName, email, password} = req.body;

          bcrypt.hash(password, saltrounds, (err, hash)=>{

         user = new User({ firstName: firstName, lastName: lastName, email: email, password: hash});

          user.save((err)=>{
         if(err){res.status(403).json({message: "Can't create user"})}
          else{res.redirect('/');}
      })

   })//End of the bcrypt hash

    }
}

];

exports.getLogin = (req, res)=>{
  res.render('login', {title: "Login"});
}

exports.postLogin = (req, res)=>{
    User.find({email: req.body.email}, (err, user)=>{
      if(user === undefined || user.length < 1){
        res.status(401).json({message:"Your email does not exist"})
      }else {
        user = user[0];
        bcrypt.compare(req.body.password, user.password, (err, passwordMatch)=>{
          if (passwordMatch === true){
            jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET);
            res.redirect('/');
          }else{
              res.status(403).json({message: "Password does not match"})
                   }
          })
}

  })

}/*Endpoint for donor signup*/

exports.getDonor = (req, res)=>{
    res.render('donor_signup', {title: "Donate!"})
}

exports.postDonor = (req, res, next)=>{
}
