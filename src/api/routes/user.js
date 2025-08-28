const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllUsers, getUserNameAndAvatarByEmail } = require('../controllers/user');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');


router.get('/', getAllUsers);
router.get('/me', auth, getProfile);
router.put('/me', auth, upload.single('avatar'), updateProfile);

router.get('/email/:email', getUserNameAndAvatarByEmail);

module.exports = router;
