
require('dotenv').config();
require("express-async-errors");
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connectDB = require('./Config/mongodb/connect');
const errorHandler = require('./Middlewares/errorHandler');
const notFound = require('./Middlewares/notFound');
const authenticationMiddeware = require('./Middlewares/authenticated');
const UserAuth = require('./Routes/User');
const UserPreferences = require('./Routes/UserPreferences');
const UserProfile = require('./Routes/UserProfile');
const UserSettings = require('./Routes/UserSettings');
const UserToolsActivities = require('./Routes/UserToolsActivities');
// const oauthRoutes = require('./Routes/Oauth');

const app = express();
const rootVersion = '/api/v1';

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





// routes
app.use('/api/v1/auth',UserAuth)
app.use('/api/v1/preferences',authenticationMiddeware,UserPreferences)
app.use('/api/v1/profile',authenticationMiddeware,UserProfile)
app.use('/api/v1/activities',authenticationMiddeware, UserToolsActivities)
app.use('/api/v1/settings',authenticationMiddeware, UserSettings)



app.use(errorHandler);
app.use(notFound);

const start = async () => {
    const connection_string = process.env.CONNECTION_STRING;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    try {
        await connectDB(connection_string,username,password);
        app.listen(process.env.PORT || 4500 ,() => {
            console.log(`the app running successufully on Port ${process.env.PORT}`);
        });
    } catch (error) {
        HandleError()
        console.log(error.error)
    }
}


start();