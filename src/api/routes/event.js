const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  attendEvent,
  getEventAttendees,
} = require('../controllers/event');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', auth, upload.single('poster'), createEvent);
router.post('/:id/attend', auth, attendEvent);
router.get('/:id/attendees', getEventAttendees);

module.exports = router;
