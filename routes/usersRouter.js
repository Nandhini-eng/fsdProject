var express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users')

var router = express.Router();
router.use(bodyParser.json())

var cors = require('cors');

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

router.route('/user/:cred')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
	const userDetails = req.params.cred.split('+')
	Users.find({'username' : userDetails[0]})
	.then((checkusername)=>{
    
    if(checkusername.length!= 0){
			if(checkusername[0].password == userDetails[1]){
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json('User credentials true')
			}
			else{
				err = new Error('Password is wrong');
				err.status = 404;
				return next(err);
			}
		}
		else{
			err = new Error('User ' + userDetails[0] + ' doesnot exists');
			err.status = 404;
			return next(err);
		}
	},(err) => next(err))
	.catch((err) => next(err))
})

module.exports = router;