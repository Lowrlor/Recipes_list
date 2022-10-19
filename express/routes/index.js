var express = require('express');
var router = express.Router();
const multer  = require('multer')

const controller = require('../controllers/controller.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    var filename = file.fieldname + '-' + uniqueSuffix + '.png'
    cb(null, filename)
    req.body.img = filename
  }
})
const upload = multer({ storage: storage })
/* GET home page. */
router.post('/', upload.single('img'), controller.create)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.delete('/removeOne/:id', controller.removeOne)
router.delete('/removeAll', controller.removeAll)
router.put('/update/:id', upload.single('img'), controller.update)

module.exports = router;
