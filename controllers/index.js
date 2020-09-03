var User = require('../models/user');
var Campaign = require('../models/campaign');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const middlewares = require('../middleware/index');
const jwt = require('jsonwebtoken');

const saltrounds = 10;


exports.home = (req, res) => {
    res.send("Hello 👋 Welcome to Team-045a-Backend!");
};

exports.register_get = (req, res)=>{
  res.render('register', {title: "Register"});
}

exports.register_post = [

    body('first_name', 'first name cannot be less than one and must contain alphanumeric characters').isLength({min: 3})
    .isAlphanumeric().trim(),
    body('last_name', 'Email name cannot be less than one and must contain alphanumeric characters').isLength({min: 3})
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

	var errors = validationResult(req);
    if(!errors.isEmpty()){
    	console.log(errors);
    	res.render('register', {errors: errors.array()});
    }else{

          bcrypt.hash('req.body.password', saltrounds, (err, hash)=>{
            
          var user = new User({
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         email: req.body.email,
         password: hash        
      });

          user.save((err)=>{
         if(err){return next(err)}
          else{res.redirect('/');}
      })

      })//End of the bcrypt hash
    }
}

];

exports.login_get = (req, res)=>{
  res.render('login', {title: "Login"});
}

exports.login_post = (req, res)=>{
    User.find({email: req.body.email}, (err, user)=>{
      if(user == undefined || user.length < 1){
        res.status(401).json({message:"Your email does not exist"})
      }else {
        var user = user[0];
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

}