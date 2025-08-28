const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    let name, email, password;
    // Si viene como FormData (con avatar)
    if (req.is('multipart/form-data')) {
      name = req.body.name;
      email = req.body.email;
      password = req.body.password;
    } else {
      // Si viene como JSON
      ({ name, email, password } = req.body);
    }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'Email already in use' });
    user = new User({ name, email, password });
    if (req.file) user.avatar = `/uploads/${req.file.filename}`;
    await user.save();
    // Auto-login after register
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    let email, password;
    if (req.is('multipart/form-data')) {
      email = req.body.email;
      password = req.body.password;
    } else {
      ({ email, password } = req.body);
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    next(err);
  }
};
