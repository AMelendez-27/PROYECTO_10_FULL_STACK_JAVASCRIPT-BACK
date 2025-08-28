const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  getEventsForUser,
  getEventsCreatedByUser,
  confirmAttendance,
  rejectAttendance,
  getEventAttendees,
  deleteEvent
} = require('../controllers/event');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');



router.get('/', getAllEvents);
router.get('/me/attending', auth, getEventsForUser);
router.get('/me/created', auth, getEventsCreatedByUser);
router.post('/', auth, upload.single('poster'), createEvent);
router.post('/:id/confirm', auth, confirmAttendance);
router.post('/:id/reject', auth, rejectAttendance);
router.get('/:id/attendees', getEventAttendees);
router.get('/:id', getEventById);
router.delete('/:id', auth, deleteEvent);

module.exports = router;
