const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();


// Imported routes
const authRoutes = require("./routes/");
const courseRoutes = require("./routes/");
const lessonRoutes = require("./routes/");
const enrollmentRoutes = require("./routes/");
const reviewRoutes = require("./routes/");
const adminRoutes = require("./routes/");

// Imported middlewares
const errorMiddleware = require("./middlewares/errorMiddleware");

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

app.listen(8080, ()=>{
    console.log(`Server running on port 8080`);
})