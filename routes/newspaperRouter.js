const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Newspapers = require('../models/newspapers');

const newspaperRouter = express.Router();

newspaperRouter.use(bodyParser.json());

var cors = require('cors');

newspaperRouter.route('/')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Newspapers.find({})
    .then((newspapers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newspapers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /newspapers');
})
.post((req, res, next) => {
    Newspapers.create(req.body)
    .then((newspaper) => {
        console.log('Newspaper Created ', newspaper);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newspaper);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Newspapers.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


newspaperRouter.route('/:paperId')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Newspapers.findById(req.params.paperId)
    .then((newspaper) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newspaper);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /newspapers/'+ req.params.newspaperId);
})
.put((req, res, next) => {
    Newspapers.findByIdAndUpdate(req.params.paperId, {
        $set: req.body
    }, { new: true })
    .then((newspaper) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newspaper);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Newspapers.findByIdAndRemove(req.params.paperId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



newspaperRouter.route('/:paperId/reviews')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Newspapers.findById(req.params.paperId)
    .then((newspaper) => {
        if (newspaper != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(newspaper.reviews);
        }
        else {
            err = new Error('Newspaper ' + req.params.paperId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Newspapers.findById(req.params.paperId)
    .then((newspaper) => {
        if (newspaper != null) {
            newspaper.reviews.push(req.body);
            newspaper.save()
            .then((newspaper) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(newspaper);
            }, (err) => next(err));
        }
        else {
            err = new Error('Newspaper ' + req.params.paperId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /newspapers/'
        + req.params.paperId + '/reviews');
})
.delete((req,res,next) => {
    Newspapers.findById(req.params.paperId)
    .then((newspaper) => {
        if (newspaper != null) {
            len = newspaper.reviews.length;
            for (var i = len-1; i >= 0; i--) {
                newspaper.reviews.id(newspaper.reviews[i]._id).remove();
            }
            newspaper.save()
            .then((newspaper) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(newspaper);
            }, (err) => next(err));
        }
        else {
            err = new Error('Newspaper ' + req.params.paperId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


newspaperRouter.route('/:paperId/reviews/:reviewId')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Newspapers.findById(req.params.paperId)
    .then((newspaper) => {
        if (newspaper != null && newspaper.reviews.id(req.params.reviewId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(newspaper.reviews.id(req.params.reviewId));
        }
        else if (newspaper == null) {
            err = new Error('Newspaper ' + req.params.paperId + ' not found');
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
    res.end('POST operation not supported on /newspapers/'+ req.params.paperId
        + '/reviews/' + req.params.reviewId);
})
.put((req,res,next) => {
    Newspapers.findById(req.params.paperId)
    .then((newspaper) => {
        if (newspaper != null && newspaper.reviews.id(req.params.reviewId) != null) {
            if (req.body.rating){
                newspaper.reviews.id(req.params.reviewId).rating = req.body.rating;
            }
            if (req.body.review){
                newspaper.reviews.id(req.params.reviewId).review = req.body.review;
            }
            newspaper.save()
            .then((newspaper) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(newspaper);
            }, (err) => next(err))
        }
        else if (newspaper == null) {
            err = new Error('Newspaper ' + req.params.paperId + ' not found');
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
    Newspapers.findById(req.params.paperId)
    .then((newspaper) => {
        if (newspaper != null && newspaper.reviews.id(req.params.reviewId) != null) {
            newspaper.reviews.id(req.params.reviewId).remove();
            newspaper.save()
            .then((newspaper) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(newspaper);
            }, (err) => next(err))
        }
        else if (newspaper == null) {
            err = new Error('Newspaper ' + req.params.paperId + ' not found');
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

module.exports = newspaperRouter;