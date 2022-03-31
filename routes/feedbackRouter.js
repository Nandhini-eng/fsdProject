

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedback = require('../models/feedback');

const feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());


feedbackRouter.route('/')
.get((req,res,next) => {
    feedback.find({})
    .then((feedback) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /feedback');
})
.post((req, res, next) => {
    feedback.create(req.body)
    .then((feedback) => {
        console.log('feedback Created ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    feedback.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


feedbackRouter.route('/:feedId')
.get((req,res,next) => {
    feedback.findById(req.params.feedId)
    .then((feedback) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /feedback/'+ req.params.feedId);
})
.put((req, res, next) => {
    feedbacks.findByIdAndUpdate(req.params.feedId, {
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
    feedbacks.findByIdAndRemove(req.params.feedId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



feedbackRouter.route('/:feedId/reviews')
.get((req,res,next) => {
    feedbacks.findById(req.params.feedId)
    .then((feedback) => {
        if (feedback != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(feedback.reviews);
        }
        else {
            err = new Error('feedback' + req.params.feedId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    feedbacks.findById(req.params.feedId)
    .then((feedback) => {
        if (feedback != null) {
            feedback.reviews.push(req.body);
            feedback.save()
            .then((feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            }, (err) => next(err));
        }
        else {
            err = new Error('feedback ' + req.params.feedId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /feedback/'
        + req.params.feedId + '/reviews');
})
.delete((req,res,next) => {
    feedbacks.findById(req.params.feedId)
    .then((feedback) => {
        if (feedback != null) {
            len = feedback.reviews.length;
            for (var i = len-1; i >= 0; i--) {
                feedback.reviews.id(feedback.reviews[i]._id).remove();
            }
            feedback.save()
            .then((feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            }, (err) => next(err));
        }
        else {
            err = new Error('feedback ' + req.params.feedId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


feedbackRouter.route('/:feedId/reviews/:reviewId')
.get((req,res,next) => {
    feedbacks.findById(req.params.feedId)
    .then((feedback) => {
        if (feedback != null && feedback.reviews.id(req.params.reviewId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(feedback.reviews.id(req.params.reviewId));
        }
        else if (feedback == null) {
            err = new Error('feedback ' + req.params.feedId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Review ' + req.params.reviewId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /feedback/'+ req.params.feedId
        + '/reviews/' + req.params.reviewId);
})
.put((req,res,next) => {
    feedbacks.findById(req.params.feedId)
    .then((feedback) => {
        if (feedback != null && feedback.reviews.id(req.params.reviewId) != null) {
            if (req.body.rating){
                feedback.reviews.id(req.params.reviewId).rating = req.body.rating;
            }
            if (req.body.review){
                feedback.reviews.id(req.params.reviewId).review = req.body.review;
            }
            feedback.save()
            .then((feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            }, (err) => next(err))
        }
        else if (feedback == null) {
            err = new Error('feedback ' + req.params.feedId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Review ' + req.params.reviewId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    feedbacks.findById(req.params.feedId)
    .then((feedback) => {
        if (feedback != null && feedback.reviews.id(req.params.reviewId) != null) {
            feedback.reviews.id(req.params.reviewId).remove();
            feedback.save()
            .then((feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            }, (err) => next(err))
        }
        else if (feedback == null) {
            err = new Error('feedback ' + req.params.feedId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Review ' + req.params.reviewId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = feedbackRouter;