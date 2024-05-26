# Virtual-Event-Management

The Event Management System is a Node.js application that provides RESTful API endpoints for managing events. It includes functionality for user registration, login, event creation, updating, deleting, and event registration. It also allows users to view and manage their event registrations. The system uses an in-memory JSON "database" to store user and event data and ensures that only authenticated and authorized users can access certain functionalities.


## Features

User Registration: Allows users to create a new account by providing a username, email, and password.
User Login: Enables existing users to log into their accounts using their email and password.
Event Creation: Permits authenticated users to create new events by providing details such as title, date, and description.
Event Updating: Allows event creators to modify the details of events they have created, including the title, date, and description.
Event Deletion: Enables event creators to delete events they have created.
Event Registration: Allows users to register for events they are interested in attending.
Viewing User's Registered Events: Provides users with the ability to view the events they have registered for.
Token-based Authentication and Authorization: Utilizes JSON Web Tokens (JWT) for secure authentication and authorization, ensuring that only authenticated users can access certain functionalities and resources.

## Installation

1. Clone the repository:

git clone https://github.com/AirtribeProjects/Virtual-Event-Management.git

2. Navigate to the project directory:

cd Virtual-event-Managment

3. Install dependencies:

npm install express
npm install axios
npm install dotenv
npm install bcrypt
npm install jsonwebtoken
npm install fs
npm install nodemailer

## Usage

1. Start the server:

node app.js

2. Use Postman or any HTTP client to interact with the API.

## Endpoints

### Authentication Endpoints
- **Register a New User:** 
    URL: `/users/register`
    Method: POST
    Request Body:
    {
        "username": "User's username",
        "email": "User's email",
        "password": "User's password"
    }

- **Login User:** 
    URL: `/users/login`
    Method: POST
    Request Body:
    {
      "username": "User's username",
       "password": "User's password"
    }

### Event Endpoints
- **Create new event:** 
    URL: `/events/events`
    Method: POST
    Headers: Authorization:access token
    Request Body:
    {
    "name": "event name",
    "creationtime": "creaiontime",
    "description": "briefdescription about the event"
    }

- **Update Event**
    URL: `/events/events/:id`
    Method: PUT
    Headers: Authorization:access token
    Request Body:
    {
    "name": "name of the event",
    "date": "create time",
    "description": "breif description about the vent"
    }

- **Delete Event**
    URL: /api/events/:id
    Method: DELETE
    Headers: Authorization: access token

-**Register for Event**

    URL:`/events/events/:id/register`
    Method: POST
    Headers: Authorization: access token

-**View User's Registered Events**
    URL: `/events/user/events`
    Method: GET
    Headers: Authorization: acess token
