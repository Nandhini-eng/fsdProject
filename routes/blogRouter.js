const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Blogs = require('../models/blogs');

const blogRouter = express.Router();

blogRouter.use(bodyParser.json());

var cors = require('cors');

blogRouter.route('/')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Blogs.find({})
    .then((blogs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blogs);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /blogs');
})
.post((req, res, next) => {
    Blogs.create(req.body)
    .then((blogs) => {
        console.log('Blog Created ', blogs);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blogs);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Blogs.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


blogRouter.route('/:blgId')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Blogs.findById(req.params.blgId)
    .then((blog) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blog);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /blogs/'+ req.params.blgId);
})
.put((req, res, next) => {
    Blogs.findByIdAndUpdate(req.params.blgId, {
        $set: req.body
    }, { new: true })
    .then((blog) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blog);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Blogs.findByIdAndRemove(req.params.blgId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = blogRouter;