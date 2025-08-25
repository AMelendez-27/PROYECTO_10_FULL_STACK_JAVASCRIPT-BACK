const Event = require('../models/event');
const User = require('../models/user');

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email avatar');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { title, date, location, description } = req.body;
    const event = new Event({
      title,
      date,
      location,
      description,
      poster: req.file ? `/uploads/${req.file.filename}` : undefined,
      attendees: [],
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

exports.attendEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already attending' });
    }
    event.attendees.push(req.user.id);
    await event.save();
    res.json({ message: 'Attendance confirmed' });
  } catch (err) {
    next(err);
  }
};

exports.getEventAttendees = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email avatar');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event.attendees);
  } catch (err) {
    next(err);
  }
};
