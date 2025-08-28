const mongoose = require('mongoose');
const User = require('../api/models/user');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.DB_URL || process.env.MONGODB_URI);
    await User.deleteMany({ email: 'test@test.com' });
    const user = new User({
      name: 'test',
      email: 'test@test.com',
      password: 'test123'
    });
    await user.save();
    console.log('Usuario de prueba creado');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error al crear usuario de prueba:', err);
  }
}

seed();
