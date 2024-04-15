// models/card.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    description: {
        type: String,
        // required: true
    },
    color: {
      type: String,
      required : true
    }
});

module.exports = mongoose.model('Card', cardSchema);
