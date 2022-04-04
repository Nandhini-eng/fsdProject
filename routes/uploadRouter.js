const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const multer = require('multer');

var cors = require('cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    
    if (file){
        var fpp = path.extname(file.originalname);
        if (fpp !== '.png' && fpp !== '.jpg' && fpp !== '.jpeg' && fpp !== '.gif'){
            return cb(new Error("File type not acceptable. You can upload only image files!"), false);
        }
        cb(null, true);
    }
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors(), (req,res) => {res.sendStatus(200); })
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imgUpload');
})
.post(upload.single('imgFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imgUpload');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imgUpload');
});

module.exports = uploadRouter;