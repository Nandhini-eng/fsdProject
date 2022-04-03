const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Reviews = require('../models/reviews');

const reviewRouter = express.Router();

reviewRouter.use(bodyParser.json());

var cors = require('cors');

reviewRouter.route('/')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Reviews.find({})
    .then((reviews) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reviews);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /reviews');
})
.post((req, res, next) => {
    Reviews.create(req.body)
    .then((review) => {
        console.log('Review Created ', review);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(review);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Reviews.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


reviewRouter.route('/:rvwId')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Reviews.findById(req.params.rvwId)
    .then((review) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(review);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /reviews/'+ req.params.rvwId);
})
.put((req, res, next) => {
    Reviews.findByIdAndUpdate(req.params.rvwId, {
        $set: req.body
    }, { new: true })
    .then((review) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(review);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Reviews.findByIdAndRemove(req.params.rvwId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = reviewRouter;