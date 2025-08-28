exports.getUserNameAndAvatarByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email }, { name: 1, avatar: 1, _id: 0 });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const User = require('../models/user');
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
};
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
const cloudinary = require('../../config/cloudinary');
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (req.file) {
      if (user.avatar && user.avatar.includes('cloudinary.com')) {
        const regex = /eventos%2F([^\.]+)\./;
        const regex2 = /eventos\/([^\.]+)\./;
        let publicId = null;
        if (user.avatar.includes('%2F')) {
          const match = user.avatar.match(regex);
          if (match) publicId = match[1];
        } else {
          const match = user.avatar.match(regex2);
          if (match) publicId = match[1];
        }
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`eventos/${publicId}`);
          } catch (e) {}
        }
      }
      updates.avatar = req.file.path;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};
