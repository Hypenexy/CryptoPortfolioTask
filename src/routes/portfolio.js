const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const getPortfolioValue = require('../services/priceService');
const path = require('path');


// POST request to create or update a portfolio
router.post('/', async (req, res) => {
    const { userId, holdings } = req.body;

    try {
        const portfolio = await Portfolio.findOneAndUpdate(
            { userId },
            { holdings },
            { new: true, upsert: true }
        );
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update portfolio' });
    }
});

// GET request to retrieve a portfolio
router.get('/value', async (req, res) => {
    const { userId } = req.query;

    try {
        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const totalValue = await getPortfolioValue(portfolio.holdings);

        res.status(200).json({ totalValue });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve portfolio value' });
    }
});

router.get('/client', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;