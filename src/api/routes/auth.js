const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const upload = require('../middlewares/upload');

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);

module.exports = router;
