const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Magazines = require('../models/magazines');

const magazineRouter = express.Router();

magazineRouter.use(bodyParser.json());


magazineRouter.route('/')
.get((req,res,next) => {
    Magazines.find({})
    .then((magazines) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(magazines);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /magazines');
})
.post((req, res, next) => {
    Magazines.create(req.body)
    .then((magazine) => {
        console.log('Magazine Created ', magazine);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(magazine);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Magazines.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


magazineRouter.route('/:magId')
.get((req,res,next) => {
    Magazines.findById(req.params.magId)
    .then((magazine) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(magazine);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /magazines/'+ req.params.magId);
})
.put((req, res, next) => {
    Magazines.findByIdAndUpdate(req.params.magId, {
        $set: req.body
    }, { new: true })
    .then((magazine) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(magazine);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Magazines.findByIdAndRemove(req.params.magId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



magazineRouter.route('/:magId/reviews')
.get((req,res,next) => {
    Magazines.findById(req.params.magId)
    .then((magazine) => {
        if (magazine != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(magazine.reviews);
        }
        else {
            err = new Error('Magazine ' + req.params.magId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Magazines.findById(req.params.magId)
    .then((magazine) => {
        if (magazine != null) {
            magazine.reviews.push(req.body);
            magazine.save()
            .then((magazine) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(magazine);
            }, (err) => next(err));
        }
        else {
            err = new Error('Magazine ' + req.params.magId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /magazines/'
        + req.params.magId + '/reviews');
})
.delete((req,res,next) => {
    Magazines.findById(req.params.magId)
    .then((magazine) => {
        if (magazine != null) {
            len = magazine.reviews.length;
            for (var i = len-1; i >= 0; i--) {
                magazine.reviews.id(magazine.reviews[i]._id).remove();
            }
            magazine.save()
            .then((magazine) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(magazine);
            }, (err) => next(err));
        }
        else {
            err = new Error('Magazine ' + req.params.magId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


magazineRouter.route('/:magId/reviews/:reviewId')
.get((req,res,next) => {
    Magazines.findById(req.params.magId)
    .then((magazine) => {
        if (magazine != null && magazine.reviews.id(req.params.reviewId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(magazine.reviews.id(req.params.reviewId));
        }
        else if (magazine == null) {
            err = new Error('Magazine ' + req.params.magId + ' not found');
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
    res.end('POST operation not supported on /magazines/'+ req.params.magId
        + '/reviews/' + req.params.reviewId);
})
.put((req,res,next) => {
    Magazines.findById(req.params.magId)
    .then((magazine) => {
        if (magazine != null && magazine.reviews.id(req.params.reviewId) != null) {
            if (req.body.rating){
                magazine.reviews.id(req.params.reviewId).rating = req.body.rating;
            }
            if (req.body.review){
                magazine.reviews.id(req.params.reviewId).review = req.body.review;
            }
            magazine.save()
            .then((magazine) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(magazine);
            }, (err) => next(err))
        }
        else if (magazine == null) {
            err = new Error('Magazine ' + req.params.magId + ' not found');
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
    Magazines.findById(req.params.magId)
    .then((magazine) => {
        if (magazine != null && magazine.reviews.id(req.params.reviewId) != null) {
            magazine.reviews.id(req.params.reviewId).remove();
            magazine.save()
            .then((magazine) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(magazine);
            }, (err) => next(err))
        }
        else if (magazine == null) {
            err = new Error('Magazine ' + req.params.magId + ' not found');
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

module.exports = magazineRouter;