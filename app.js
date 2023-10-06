const express = require('express')

const session = require("express-session");
const MongoStorage = require("connect-mongo");
const passport = require("passport");

// Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing the server to handle requests from different origins.
const cors = require('cors');

// Middleware for parsing cookies attached to incoming requests, making it easier to handle and manipulate cookies.
const cookieParser = require('cookie-parser')

// Middleware for logging HTTP requests to the console, providing information about incoming requests and their status.
const morgan = require('morgan');

const errorHandling = require('./middleware/errorHandling')
const authRoute = require('./routes/userRouter')
const upload = require('./routes/uploadImageRouter')
const courseRouter = require('./routes/courseRouter')
const challengeRouter = require('./routes/challengeRouter')
// Dotenv is used to load environment variables from a .env file into process.env. 
const dotenv = require('dotenv')
dotenv.config()

// Connect to the database 
const connectMongoDb = require('./config/connectMongoDb');

const app = express()
app.use(cors()) 

// Middleware to parse JSON-encoded request bodies, allowing the server to handle JSON data sent in the request body.
app.use(express.json())

// Middleware to parse URL-encoded request bodies, which is common for form submissions on web pages.
app.use(express.urlencoded({extended:false})) 

// Configuring Morgan to log HTTP requests in the 'dev' format
app.use(morgan('dev'))

// Using the cookieParser middleware to parse cookies from incoming requests, making them accessible in the request object.
app.use(cookieParser())



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStorage({
        mongoUrl: process.env.MONGODB_URL,
        dbName: 'junction',
        collectionName: 'sessions'
    }),
    cookie:
    {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    }
}));

require('./utils/passport');

app.use(passport.initialize());
app.use(passport.session());

connectMongoDb()

// Routes 

//Auth route
app.use('/api/auth',authRoute)

// Upload image
app.use('/api/upload',upload)

// courses route
app.use('/api/course',courseRouter)  

// challenge route
app.use('/api/challenge',challengeRouter)  

// Custom middleware to handle requests for routes that do not exist, returning a 404 Not Found response.
app.use(errorHandling.notFound)
// Custom error handling middleware to capture and handle errors in the application, providing detailed error information in the response.
app.use(errorHandling.errorHandler)

// Configuring the server to listen on the specified port number (from environment variables or defaulting to 4000) 
// and logging a message to the console once the server is successfully runn
const PORT = process.env.PORT  || 4000
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT} `)
})