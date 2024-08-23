const { postUpdate } = require('./../controllers/uploadController');
const router = require('express').Router();

const multer = require('multer');
const storage = multer.memoryStorage();

router.post('/update', multer({ storage }).array("images"), postUpdate);

module.exports = router;