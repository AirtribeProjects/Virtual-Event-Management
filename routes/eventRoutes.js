const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');
const verifyToken = require('../Middleware/authJWT');

// Event Creation
router.post('/events', verifyToken, eventController.createEvent);
// Update the event
router.put('/events/:id', verifyToken, eventController.updateEvent);
//delete the event
router.delete('/events/:id', verifyToken, eventController.deleteEvent);
// register user for event
router.post('/events/:id/register', verifyToken, eventController.registerForEvent);
// get events for user
router.get('/user/events', verifyToken, eventController.viewUserEvent);
//get participants of the event
router.get('/:id/participants', eventController.getEventParticipants);

module.exports = router;