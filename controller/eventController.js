const eventService = require('../service/eventService');
const { getUserById, getUserEvents } = require('../service/userService');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Controller functions for user related actions
const eventController = {
    /*
        creates the new event with eventname,creationtime,date,participants
    */
    createEvent: async (req, res) => {
        try {
            const eventInfo = req.body;
            const userId = req.user.userId;

            const event = await eventService.createEvent(eventInfo, userId);
            return res.status(201).json(event);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    },
    /*
        update the existing event
    */
    updateEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const eventInfo = req.body;
            const userId = req.user.userId;

            const event = await eventService.updateEvent(id, eventInfo, userId);
            return res.status(200).json(event);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    /*
        deletes the existing event
    */
    deleteEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.userId;

            const result = await eventService.deleteEvent(id, userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    /*
        register the user for event
    */
    registerForEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.userId;

            const event = await eventService.registerForEvent(id, userId);
            const user = await getUserById(userId);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Event Registration Confirmation',
                text: `You have successfully registered for the event: ${event.name}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.status(200).json({ message: 'Successfully registered' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    /*
        get the events registered by loged in user
    */
    viewUserEvent: async (req, res) => {
        try {
            const userId = req.user.userId;
            const events = await getUserEvents(userId);
            return res.status(200).json(events);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
    * Controller for retrieving event participants.
    */
    getEventParticipants: async(req, res) => {
        try {
            const eventId = parseInt(req.params.id);
            const participants = await eventService.getEventParticipants(eventId);
            res.status(200).json(participants);
        } catch(error){
            return res.status(500).json({ message: error.message });
        }
       
    }
}

module.exports = eventController;