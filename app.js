var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var newspapersRouter = require('./routes/newspaperRouter');
var feedbackRouter = require('./routes/feedbackRouter')

var magazinesRouter = require('./routes/magazineRouter');
var blogRouter = require('./routes/blogRouter')
var ordersRouter=require('./routes/ordersRouter')


var app = express();
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: true, credentials: true}));

app.use(
  "/swagger-api",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


const mongoose = require('mongoose');



// const url = 'mongodb+srv://samhithareddy:Samhi_905@cluster0.4wv9m.mongodb.net/fsd3project';
//const url = 'mongodb+srv://Bhanu:bhanu@cluster0.4wv9m.mongodb.net/fsd3project';
//const url = 'mongodb+srv://Nandhini:Nandy2002@cluster0.4wv9m.mongodb.net/fsd3project';
// const url = 'mongodb+srv://bhagya:bhagya23@cluster0.4wv9m.mongodb.net/fsd3project';
const url = 'mongodb+srv://samhithareddy:Samhi_905@cluster0.4wv9m.mongodb.net/fsd3project';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to mongodb server");
}, (err) => { console.log(err); });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/newspapers',newspapersRouter);
app.use('/magazines',magazinesRouter);
app.use('/feedbacks',feedbackRouter);

app.use('/blogs',blogRouter);

app.use('/orders',ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
