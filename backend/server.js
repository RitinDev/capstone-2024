const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());        // Body parser
app.use(cors());               // Enable CORS

// Define routes
app.use('/api/users', require('./routes/users'));
// app.use('/api/questions', require('./routes/questions'));
// app.use('/api/answers', require('./routes/answers'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
