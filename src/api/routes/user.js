const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/user');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/me', auth, getProfile);
router.put('/me', auth, upload.single('avatar'), updateProfile);

module.exports = router;
