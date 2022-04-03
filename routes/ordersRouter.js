const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Orders = require('../models/orders');

const ordersRouter = express.Router();

ordersRouter.use(bodyParser.json());
var cors= require('cors')


ordersRouter.route('/')
.get((req,res,next) => {
    Orders.find({})
    .then((orders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.post((req, res, next) => {
    Orders.create(req.body)
    .then((order) => {
        console.log('Order Created ', order);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    

    res.statusCode = 403;
    res.end('DELETE operation not supported on /orders');

});





ordersRouter.route('/:orderId')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req,res,next) => {
    Orders.findById(req.params.orderId)
    .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /orders/'+ req.params.orderId);
})
.put((req, res, next) => {
    res.statusCode = 403;
  res.end('PUT operation not supported on /orders/'+ req.params.orderId);
    
})
.delete((req, res, next) => {
    
    Orders.findByIdAndRemove(req.params.orderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));

}

);








module.exports = ordersRouter;