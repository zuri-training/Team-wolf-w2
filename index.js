require("express-async-errors");
const express = require("express");
const connect = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");
connect();
const app = express();

//import routes
const authRoutes = require ("./routes/userRoutes")
app.use(cors());
app.use(express.json());



//middlewares 
app.use('/api/v1', authRoutes)

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Our Website");
});

app.listen(PORT, () => console.log(`server on port ${PORT}`));
