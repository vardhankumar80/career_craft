const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const chatGuideRoutes = require("./routes/chat.guide.routes");
const chatTestRoutes = require("./routes/chat.test.routes");
const annalysRoutes = require("./routes/annalys.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/user", userRoutes);
app.use("/chat-guide", chatGuideRoutes);
app.use("/chat-test", chatTestRoutes);
app.use("/annalys", annalysRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const path = require('path');
const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

