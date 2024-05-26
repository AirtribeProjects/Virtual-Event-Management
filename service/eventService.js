const eventData = './DB/events.json'
const { writeDataToFile, readDataFromFile } = require('../Utils/utils');
const { updateUserEvents } = require('./userService');
class EventManager {

    // Event related methods
    /**
     * 
     create new event with eventdetails provided
     */
    static async createEvent(eventInfo, userId) {
        try {
            const events = await readDataFromFile(eventData);

            const newEvent = {
                eventId: events.length + 1,
                name: eventInfo.name,
                creationTime: Date.now(),
                description: eventInfo.description,
                participants: [],
                createdBy: userId
            };

            events.push(newEvent);
            await writeDataToFile(eventData, events);

            return newEvent;
        } catch (error) {
            throw new Error('Failed to create event: ' + error.message);
        }

    }
    /**
     * 
     update the eventdetails for the given event id
     */
    static async updateEvent(id, eventInfo, userId) {
        const events = await readDataFromFile(eventData);
        const event = events.find(event => event.eventId === parseInt(id));

        if (!event) {
            throw new Error('Event not found');
        }

        if (event.createdBy !== userId) {
            throw new Error('Unauthorized');
        }

        event.name = eventInfo.name;
        event.creationTime = Date.now();
        event.description = eventInfo.description;
        await writeDataToFile(eventData, events);

        return event;
    }
    /**
     * 
     *delete the user
     */
    static async deleteEvent(id, userId) {
        let events = await readDataFromFile(eventData);
        const eventIndex = events.findIndex(event => event.eventId === parseInt(id));

        if (eventIndex === -1) {
            throw new Error('Event not found');
        }

        const event = events[eventIndex];
        if (event.createdBy !== userId) {
            throw new Error('Unauthorized');
        }

        events = events.filter(event => event.eventId !== parseInt(id));
        await writeDataToFile(eventData, events);

        return { message: 'Event deleted' };
    }
    /**
     * register user for the event
     */
    static async registerForEvent(eventId, userId) {
        const events = await readDataFromFile(eventData);
        const event = events.find(event => event.eventId === parseInt(eventId));

        if (!event) {
            throw new Error('Event not found');
        }

        if (event.participants.includes(userId)) {
            throw new Error('Already registered');
        }

        event.participants.push(userId);
        await writeDataToFile(eventData, events);
        await updateUserEvents(userId, eventId);

        return event;
    }
    /**
     * Get participants for the given eventid
     */
    static async getEventParticipants(eventId) {
        const events = await readDataFromFile(eventData);
        const event = events.find(event => event.eventId === eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        return event.participants;
    }
}

module.exports = EventManager;