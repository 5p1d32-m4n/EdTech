const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Swagger config
const swaggerSetup = require("./swagger");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger-output.json");
// Imported routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
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
app.get("/api", (req, res) => {
    res.json({ test: ["this", "is", "a", "test"] });
})
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/lessons', lessonRoutes);
// app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Error handling middleware
app.use(errorMiddleware)

module.exports = app;