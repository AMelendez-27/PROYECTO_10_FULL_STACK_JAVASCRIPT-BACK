const Event = require('../models/event');
const User = require('../models/user');
const cloudinary = require('../../config/cloudinary');
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
};
exports.getEventsForUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ attendees: userId }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
};
exports.getEventsCreatedByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ creator: userId }).sort({ date: 1 });
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
    let title, date, location, description, attendeeEmails;
    if (req.is('multipart/form-data')) {
      title = req.body.title;
      date = req.body.date;
      location = req.body.location;
      description = req.body.description;
      attendeeEmails = req.body.attendeeEmails;
    } else {
      ({ title, date, location, description, attendeeEmails } = req.body);
    }
    let attendees = [];
    if (attendeeEmails) {
      const emails = attendeeEmails.split(',').map(e => e.trim()).filter(Boolean);
      attendees = await User.find({ email: { $in: emails } }, '_id');
      attendees = attendees.map(u => u._id);
    }
    const event = new Event({
      title,
      date,
      location,
      description,
      poster: req.file ? req.file.path : undefined,
      attendees,
      confirmed: [],
      rejected: [],
      creator: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};
exports.confirmAttendance = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    const userId = req.user.id;
    if (!event.attendees.includes(userId)) {
      return res.status(400).json({ error: 'User not registered for this event' });
    }
    event.rejected = event.rejected.filter(u => u.toString() !== userId);
    if (!event.confirmed.includes(userId)) {
      event.confirmed.push(userId);
    }
    await event.save();
    res.json({ message: 'Attendance confirmed' });
  } catch (err) {
    next(err);
  }
};
exports.rejectAttendance = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    const userId = req.user.id;
    if (!event.attendees.includes(userId)) {
      return res.status(400).json({ error: 'User not registered for this event' });
    }
    event.confirmed = event.confirmed.filter(u => u.toString() !== userId);
    if (!event.rejected.includes(userId)) {
      event.rejected.push(userId);
    }
    await event.save();
    res.json({ message: 'Attendance rejected' });
  } catch (err) {
    next(err);
  }
};
exports.getEventAttendees = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('attendees', 'name email avatar')
      .populate('confirmed', 'name email avatar')
      .populate('rejected', 'name email avatar');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({
      attendees: event.attendees,
      confirmed: event.confirmed,
      rejected: event.rejected
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }
    if (event.poster && event.poster.includes('cloudinary.com')) {
      const regex = /eventos%2F([^\.]+)\./;
      const regex2 = /eventos\/([^\.]+)\./;
      let publicId = null;
      if (event.poster.includes('%2F')) {
        const match = event.poster.match(regex);
        if (match) publicId = match[1];
      } else {
        const match = event.poster.match(regex2);
        if (match) publicId = match[1];
      }
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(`eventos/${publicId}`);
        } catch (e) {}
      }
    }
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
};
