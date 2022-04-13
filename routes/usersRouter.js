var express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users')

var router = express.Router();
router.use(bodyParser.json())

var cors = require('cors');

var jwt = require("jsonwebtoken");

let secret = "iiits"
router.route('/')
.options(cors(), (req,res) => {res.sendStatus(200); })
  .get((req, res, next) => {
    Users.find({})
      .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    Users.find({ 'username': req.body.username })
      .then((user) => {
        if (user.length == 0) {
          Users.create(req.body)
            .then((user) => {
              console.log('User Created ', user);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(user);
            }, (err) => next(err));
        }
        else {
          err = new Error('User ' + req.body.username + ' aleady exists. Choose other name');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403
    res.end("PUT Operation is not supported here")
  })
  .delete((req, res, next) => {
    Users.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  })

router.route('/:username')
.options(cors(), (req,res) => {res.sendStatus(200); })
  .get((req, res, next) => {
    Users.find({ 'username': req.params.username })
      .then((user) => {
        if(user.length!=0){
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(user)
        }
        else{
          err = new Error('User ' + req.params.username + ' doesnot exists');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  // .post((req, res, next) => {
  //   res.statusCode = 403;
  //   res.end('POST operation not supported on /Users/' + req.body.username);
  // })
  .put((req, res, next) => {
    Users.find({ 'username': req.params.username })
      .then((checkuser) => {
        if (checkuser.length != 0) {
          Users.find({ 'username': req.body.username })
            .then((newuser) => {
              if (newuser.length == 0) {
                checkuser[0].username = req.body.username
                checkuser[0].save()
                  .then((updateuser) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(checkuser)
                  }, (err) => next(err))

              }
              else {
                err = new Error('User ' + req.body.username + ' already exists. Choose new');
                err.status = 404;
                return next(err);
              }
            }, (err) => next(err))
        }
        else {
          err = new Error('User ' + req.params.username + ' doesnot exists');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .delete((req, res, next) => {
    Users.find({ 'username': req.params.username })
      .then((user) => {
        if (user.length != 0) {
          Users.findByIdAndRemove(user[0]._id)
            .then((user) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json('User deleted with username ' + req.params.username);
            }, (err) => next(err));
        }
        else {
          err = new Error('User ' + req.body.username + ' doesnot exists');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  });

router.route('/login')
 .options(cors(), (req,res) => {res.sendStatus(200); })
.post((req,res,next)=>{
  console.log(req.body.password)
  Users.find({'username' : req.body.username})
.then((checkusername)=>{
  
  if(checkusername.length!= 0){
    if(checkusername[0].password == req.body.password){
      var token = jwt.sign({id : checkusername[0]._id}, secret, {expiresIn: 86400});
      res.statusCode = 200;
      // res.setHeader('Content-Type', 'application/json');
      // res.json(checkusername)
      res.send({
        id: checkusername[0]._id,
        username: checkusername[0].username,
        accessToken: token
      });
    }
    else{
      err = new Error('Password is wrong');
      err.status = 404;
      return next(err);
    }
  }
  else{
    err = new Error('User ' + req.body.username + ' doesnot exists');
    err.status = 404;
    return next(err);
  }
},(err) => next(err))
.catch((err) => next(err))
}) 

module.exports = router;