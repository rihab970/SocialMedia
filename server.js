const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const reactionRoutes = require("./routes/reactionroutes");
const commentRoutes = require("./routes/commentRoutes");



const app = express();
var corsOptions = {
    origine : "*",
    Credential: "true",
};


app.options("*", cors());
app.use(cors(corsOptions));

dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running******");
});


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reaction",reactionRoutes);
app.use("/api/comment",commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));