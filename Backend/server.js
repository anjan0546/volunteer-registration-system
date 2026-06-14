const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const volunteerRoutes = require("./routes/volunteerRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/volunteers", volunteerRoutes);



app.get("/", (req, res) => {
  res.send("Volunteer Registration API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});