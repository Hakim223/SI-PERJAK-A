  const express = require('express');
  const router = express.Router();
  const Event = require('../models/event'); 

  router.post('/', async (req, res) => {
    try {
      const eventData = req.body;
      const newEvent = new Event(eventData);
      await newEvent.save();
      res.status(201).json({ message: 'Event added', eventId: newEvent._id });
    } catch (err) {
      console.error('Error adding event:', err);
      res.status(500).json({ error: 'Failed to add event' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      console.log(eventId);
      const result = await Event.deleteOne({ _id: eventId });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Event deleted' });
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  });

  module.exports = router;
