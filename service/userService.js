const userData = './DB/user.json';
const bcrypt = require('bcrypt');
const {writeDataToFile,readDataFromFile} = require('../Utils/utils');
const jwt = require('jsonwebtoken');


/**
 * Registers a new user with the provided username, email, and password.
 */
const registerUser = async(userInfo,users) => {
    try {
        const hashedPassword = await bcrypt.hash(userInfo.password, 10);
        userId = users.length + 1;
        const newUser = {
            userId:userId, 
            userName: userInfo.userName, 
            emailID: userInfo.emailId, 
            password: hashedPassword,
            events: []
        };
        users.push(newUser);
        // Write updated user data to users.json file
        await writeDataToFile(userData, users);
        const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: '2h' });

        return { user: newUser, token };
    } catch (error) {
        throw new Error('registerUser: ' + error);
    }
}

/**
 * Updates the events for a user.
 */
const updateUserEvents = async(userId, eventId) => {
    try {
        const users = await readDataFromFile(userData);
        const user = users.find(user => user.userId === userId);
        if (user) {
            user.events.push(eventId);
            await writeDataToFile(userData, users);
        }
    } catch(error){
        throw new Error('updateUserEvents: ' + error);
    }
   
}
/**
 * get userdetails for for given userid
 */
const getUserById = async(userId) => {
    const users = await readDataFromFile(userData);
    return users.find(user => user.userId === userId);
}
/**
 * * Gets the events a user is registered for.
 */
const getUserEvents = async(userId)=>{
    const users = await readDataFromFile(userData);
    const user = users.find(user => user.userId === userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.events;
}

module.exports = {registerUser,updateUserEvents,getUserById,getUserEvents};