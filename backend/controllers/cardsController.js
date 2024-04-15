const Card = require('../models/card');

exports.getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createCard = async (req, res) => {
    const { description } = req.body;
    const rColor = Math.random();
    const color = (rColor < 1 / 3) ? "bg-lime-500" : ((rColor < 2 / 3) ? "bg-orange-500" : "bg-blue-500");
    try {
        const newCard = new Card({ description, color }); // Assuming Card is your Mongoose model
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateCard = async (req, res) => {
    console.log("u are at update fn");
    const { id } = req.params;
    const { description } = req.body;
    try {
        const updatedCard = await Card.findByIdAndUpdate(id, { description }, { new: true });
        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(updatedCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteCard = async (req, res) => {
    // console.log("delete fn");
    try {
        const { id } = req.params;
        const deletedCard = await Card.findByIdAndDelete(id);
        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
