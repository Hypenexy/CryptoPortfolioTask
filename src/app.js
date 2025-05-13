const express = require('express');
const mongoose = require('mongoose');
const portfolioRoutes = require('./routes/portfolio');

// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/portfolio", portfolioRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "127.0.0.1:5500", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Crypto Portfolio API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});