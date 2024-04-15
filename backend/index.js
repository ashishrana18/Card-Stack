// index.js
const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cards', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

app.use('/', cardsRouter);
app.get('/', (req, res) => {
  res.send('Server is running'); // You can customize this message as needed
});

// Start the server
const PORT =  3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
