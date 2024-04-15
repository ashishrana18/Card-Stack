// routes/cards.js
const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cardsController');

// Routes
router.get('/cards', cardsController.getCards);
router.post('/cards', cardsController.createCard);
router.patch('/cards/:id', cardsController.updateCard);
router.delete('/cards/:id', cardsController.deleteCard);

module.exports = router;
