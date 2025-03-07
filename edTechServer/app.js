const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Imported routes
const authRoutes = require("./routes/");
const courseRoutes = require("./routes/");
const lessonRoutes = require("./routes/");
const enrollmentRoutes = require("./routes/");
const reviewRoutes = require("./routes/");
const adminRoutes = require("./routes/");
// Imported middlewares
const errorMiddleware = require("./middlewares/errorMiddleware");


const app = express();


// Middleware Confib
const corsOptions = {
    origin: "http://localhost:5173"
}
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));


// Route config
app.get("/api", (req, res)=>{
    res.json({test: ["this", "is", "a", "test"]});
})
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorMiddleware)

module.exports = app;