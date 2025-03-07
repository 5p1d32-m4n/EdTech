const app = require("./app");
const {connectDB} = require("./config/db");
const config = require("./config/config");

const PORT = config.PORT || 5000;

//Connect DB
connectDB();

//Start the server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});