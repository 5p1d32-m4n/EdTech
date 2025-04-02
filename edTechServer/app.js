const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Imported routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
// Imported middlewares
const errorMiddleware = require("./middlewares/errorMiddleware");
require("dotenv").config();


const app = express();


// Middleware Confib
const corsOptions = {
    origin: 'http://localhost:5173', // for cors origin policies (address for front end if the api and front end share the same server)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
app.use(express.json());
app.use(morgan('dev'));
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));


// Route config
app.get("/api", (req, res) => {
    res.json({ test: ["this", "is", "a", "test"] });
})
app.use('/api', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/lessons', lessonRoutes);
// app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
    console.log(`Recieved unhandled request to: ${req.method} ${req.originalUrl}`);
    res.status(404).json({error: 'Route not found.'});
})

// Error handling middleware
app.use(errorMiddleware)

module.exports = app;