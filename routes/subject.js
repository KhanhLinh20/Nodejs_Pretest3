var express = require('express');
const subjectModel = require('../model/subjectModel');
var router = express.Router();

const bcryptjs = require('bcryptjs');
const multer = require('multer');
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    }, 
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});
const upload = multer({storage: store});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


/* GET home page */
router.get('/', async function(req, res, next) {
  let findSubject = await subjectModel.find();
  res.render('subject/index', { subjects: findSubject });
});

/* GET create page */
router.get('/create', async function(req, res, next) {
    res.render('subject/create');
});

/* POST create page */
router.post('/createPost', upload.single('image'), async function(req, res, next) {
    
    let file = req.file;
    let subjectReq = new subjectModel({
        subjectID: req.body.subjectID,
        subjectName: req.body.subjectName,
        subjectPrice: req.body.subjectPrice,
        subjectHours: req.body.subjectHours,
        image: file.filename
    });
    const existingSubject = await subjectModel.findOne({subjectID: req.body.subjectID});
    if (existingSubject) {
        return res.render('subject/create', {message: 'ID already exist!'});
    }
    await subjectReq.save();
    res.redirect('/subject');
});

/* GET delete page */
router.get('/delete/:id', async function(req, res, next) {
    await subjectModel.deleteOne({_id: req.params.id});
    res.redirect('/subject');
});

/* GET update page */
router.get('/update/:id', async function(req, res, next) {
    let updateSubject = await subjectModel.findOne({_id: req.params.id});
    res.render('subject/update', {updateSubject});
});

/* POST update page */
router.post('/updatePost/:id', upload.single('image'), async function(req, res, next) {
    let file = req.file;
    const body = req.body;
    if (!file) {   
        await subjectModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body});
        res.redirect('/subject');
    }
    else {
        let updateData = {
            subjectID: body.subjectID,
            subjectName: body.subjectName,
            subjectPrice: body.subjectPrice,
            subjectHours: body.subjectHours,
            image: file.filename
        };
        await subjectModel.findOneAndUpdate({_id: req.params.id}, {$set: updateData});
        res.redirect('/subject');
    }
});

/* Search by name */
router.get('/search', async (req, res) => {
    const searchByName = req.query.subjectName; // Lấy tên sản phẩm từ query parameter

    // Tìm kiếm tên sản phẩm trong cơ sở dữ liệu
    const subjectSearch = await subjectModel.find({subjectName: {$regex: new RegExp(searchByName, "i")}});
    if (subjectSearch.length === 0) {
        // Không tìm thấy sản phẩm phù hợp
        res.render('subject/index', { messageSearch: "Search Not Found" });
    } else {
        // Tìm thấy sản phẩm, trả về kết quả
        res.render('subject/index', {subjects: subjectSearch});
    }
});

/* Search by price */
router.get('/searchPrice', async(req, res) => {
    // Lấy giá trị tối thiểu và tối đa từ query parameters
    const searchMinPrice = parseFloat(req.query.minPrice) || 0;
    const searchMaxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    // Tìm kiếm sản phẩm trong khoảng giá
    const subjectsSeacrchPrice = await subjectModel.find({ subjectPrice: { $gte: searchMinPrice, $lte: searchMaxPrice } });
    if (!subjectsSeacrchPrice || subjectsSeacrchPrice.length === 0) {
        // Không tìm thấy sản phẩm phù hợp
        res.render('subject/index', { messageSearch: "Search Not Found" });
    } else {
        // Tìm thấy sản phẩm, trả về kết quả
        res.render('subject/index', {subjects: subjectsSeacrchPrice});
    }
})

/* GET sort by price: low to high */
router.get('/sortPriceLowToHigh', async(req, res) => {
    const subjectsAscending = await subjectModel.find().sort({ subjectPrice: 1 });
    res.render('subject/index', {subjects: subjectsAscending});
})

/* GET sort by price: high to low */
router.get('/sortPriceHighToLow', async(req, res) => {
    const subjectsDescending = await subjectModel.find().sort({ subjectPrice: -1 });
    res.render('subject/index', {subjects: subjectsDescending});
})

/* GET sort by name */
router.get('/sortByName', async(req, res) => {
    const sortName = await subjectModel.find().sort({subjectName: 1});
    res.render('subject/index', {subjects: sortName});
})


module.exports = router;
