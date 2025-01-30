const axios = require('axios');

const fetchDigestData = async () => {
    try {
        const apiKey = process.env.STOCK_API_KEY;
        const newsApiKey = process.env.NEWS_API_KEY;

        // Fetch top 5 news headlines
        const newsResponse = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
        );
        const news = newsResponse.data.articles
            ? newsResponse.data.articles.slice(0, 5).map((article) => ({
                  title: article.title,
                  url: article.url,
              }))
            : [{ title: 'No news available', url: '#' }];

        // Fetch NVDA stock data
        const nvdaResponse = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NVDA&interval=5min&apikey=${apiKey}`
        );
        const nvdaData = nvdaResponse.data['Time Series (5min)'];
        const nvdaLatestTime = nvdaData ? Object.keys(nvdaData)[0] : 'N/A';
        const nvdaLatestPrice = nvdaData ? nvdaData[nvdaLatestTime]['1. open'] : 'N/A';

        // Fetch indices using "Global Quote"
        const indices = ['NASDAQ', 'S&P 500', 'Dow Jones'];
        const indicesData = await Promise.all(
            indices.map(async (index) => {
                const symbol =
                    index === 'NASDAQ' ? '^IXIC' : index === 'S&P 500' ? '^GSPC' : index === 'Dow Jones' ? '^DJI' : '';
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
                );
                console.log(`${index} API Response:`, response.data);
                const price = response.data['Global Quote'] ? response.data['Global Quote']['05. price'] : 'N/A';
                return { name: index, price: `$${price}` };
            })
        );

        // Fetch currency pairs
        const currencies = ['EUR/USD', 'GBP/USD'];
        const currencyData = await Promise.all(
            currencies.map(async (pair) => {
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${pair.split('/')[0]}&to_currency=${pair.split('/')[1]}&apikey=${apiKey}`
                );
                console.log(`${pair} API Response:`, response.data);
                const exchangeRate = response.data['Realtime Currency Exchange Rate']
                    ? response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
                    : 'N/A';
                return { pair, rate: exchangeRate !== 'N/A' ? parseFloat(exchangeRate).toFixed(4) : 'N/A' };
            })
        );

        return {
            news,
            nvda: `$${nvdaLatestPrice} (latest update: ${nvdaLatestTime})`,
            indices: indicesData,
            currencies: currencyData,
        };
    } catch (err) {
        console.error('Error fetching digest data:', err.message);
        throw err;
    }
};

module.exports = { fetchDigestData };
