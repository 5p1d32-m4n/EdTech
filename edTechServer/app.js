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
    origin: ['http://localhost:5030', 'http://localhost:3000'], // Add your Swagger UI port
    credentials: true
}
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));


// Route config
app.get("/api", (req, res) => {
    res.json({ test: ["this", "is", "a", "test"] });
})
app.use('/api/auth', authRoutes);
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