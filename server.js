const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const path = require('path');

const app = express();
const port = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint raiz para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint de scraping
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const url = `https://www.amazon.com/s?k=${keyword}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const items = [];

    document.querySelectorAll('.s-main-slot .s-result-item').forEach(item => {
      const title = item.querySelector('h2 a span')?.textContent || 'No title';
      const rating = item.querySelector('.a-icon-alt')?.textContent.split(' ')[0] || 'No rating';
      const reviews = item.querySelector('.a-size-base')?.textContent || 'No reviews';
      const image = item.querySelector('.s-image')?.src || 'No image';
      const link = item.querySelector('h2 a')?.href || 'No link';

      items.push({
        title,
        rating,
        reviews,
        image,
        link: `https://www.amazon.com${link}`
      });
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
