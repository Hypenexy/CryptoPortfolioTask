const axios = require('axios');

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

// Mapping of symbols to CoinGecko IDs
const SYMBOL_TO_ID = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    ADA: 'cardano',
    DOGE: 'dogecoin',
    // Add more mappings as needed
};

/**
 * Fetches crypto prices from CoinGecko and calculates the total portfolio value in USD.
 * @param {Array} portfolio - Array of objects containing crypto symbol and amount. Example: [{ symbol: 'BTC', amount: 2 }]
 * @returns {Promise<number>} - Total portfolio value in USD.
 */
module.exports = async function getPortfolioValue(portfolio) {
    try {
        // Map symbols to CoinGecko IDs
        const ids = portfolio
            .map(item => SYMBOL_TO_ID[item.symbol.toUpperCase()])
            .filter(Boolean) // Remove undefined mappings
            .join(',');

        if (!ids) {
            throw new Error('No valid cryptocurrency IDs found in the portfolio');
        }

        const response = await axios.get(API_URL, {
            params: {
                ids: ids,
                vs_currencies: 'usd',
            },
        });

        const prices = response.data;
        const totalValue = portfolio.reduce((total, item) => {
            const id = SYMBOL_TO_ID[item.symbol.toUpperCase()];
            const price = id ? prices[id]?.usd || 0 : 0;
            return total + item.amount * price;
        }, 0);

        return totalValue;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        throw new Error('Failed to fetch crypto prices');
    }
};