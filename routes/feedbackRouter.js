

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Feedback = require('../models/feedback');

const feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());

var cors = require('cors');

feedbackRouter.route('/')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Feedback.find({})
    .then((feedbacks) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedbacks);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /feedbacks');
})
.post((req, res, next) => {
    Feedback.create(req.body)
    .then((feedback) => {
        console.log('feedback Created ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
        res.statusCode = 403;
        res.end('Delete operation not supported on /feedbacks');
          
});


feedbackRouter.route('/:feedId')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
        res.statusCode = 403;
        res.end('Get operation not supported on /feedbacks');
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /feedbacks');
})
.put((req, res, next) => {
    Feedback.findByIdAndUpdate(req.params.feedId, {
        $set: req.body
    }, { new: true })
    .then((feedback) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
        res.statusCode = 403;
        res.end('Delete operation not supported on /feedbacks');
});


module.exports = feedbackRouter;