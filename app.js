const express = require('express')

// Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing the server to handle requests from different origins.
const cors = require('cors');

// Middleware for parsing cookies attached to incoming requests, making it easier to handle and manipulate cookies.
const cookieParser = require('cookie-parser')

// Middleware for logging HTTP requests to the console, providing information about incoming requests and their status.
const morgan = require('morgan');

const errorHandling = require('./middleware/errorHandling')
const authRoute = require('./routes/authRoute')
// Dotenv is used to load environment variables from a .env file into process.env. 
const dotenv = require('dotenv')
dotenv.config()

// Connect to the database 
const connectMongoDb = require('./config/connectMongoDb');

const app = express()

// Middleware to parse JSON-encoded request bodies, allowing the server to handle JSON data sent in the request body.
app.use(express.json()) 

// Middleware to parse URL-encoded request bodies, which is common for form submissions on web pages.
app.use(express.urlencoded({extended:false})) 

// Configuring Morgan to log HTTP requests in the 'dev' format
app.use(morgan('dev'))

// Using the cookieParser middleware to parse cookies from incoming requests, making them accessible in the request object.
app.use(cookieParser())

// Make the cors reasable after adding to him the configuration file 
const corsOptions = require('./config/corsOptions')
app.use(cors(corsOptions))

connectMongoDb()

// Routes 

//Auth route
app.use('/api/auth',authRoute)







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