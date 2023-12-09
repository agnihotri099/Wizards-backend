const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // to accept json data
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("API Running!");
});

// Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/pet", require("./routes/petRoutes"));
// app.use("/api/fav", require("./routes/favRoutes"));


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});