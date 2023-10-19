# BRAIN BUSTER (Backend)

### Introduction
Brain Buster is a trivia game app that enables users to select category and play based on their selection

### Support Features
* Users can sign up and login to their accounts
* Users can update their username or password
* Users can play a game based on their preferred category

### Installation
* Run npm install to install dependencies
* .env file is not included (Delcare your PORT, game database, userdatabase, and JWT secret)

### Usage
* nodemon server.js

#### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /user | To sign up a new user account |
| GET| /user| To validate user based on username |
| PUT | /user/:username | To update username or password |
| PUT | /user/delete/:username | soft deletion of user account |
| PUT| /user/:username | NOT YET WORKING- update user highscore |
| POST | /login | To allow user to sign in based on username and password |
| GET | /play?category=*update*| fetch question object based on category |

### Tehnologies Used/ Dependencies
* ExpressJS
* MongoDB
* Mongoose
* bcrypt
* cors
* dotenv
* helmet
* jsonwebtoken
* uuidv4  