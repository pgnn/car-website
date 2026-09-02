const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.CAR_VERSION || 'v1';

const cars = [
  { name: 'Tesla Model 3', price: '$38,000' },
  { name: 'Porsche 911', price: '$106,000' },
  { name: 'VW Golf GTI', price: '$31,000' },
];

app.get('/', (req, res) => {
  const rows = cars
    .map((c) => `<li>${c.name} - ${c.price}</li>`)
    .join('');
  res.send(`
    <html>
      <head><title>Car Shop</title></head>
      <body>
        <h1>Car Shop</h1>
        <p>Build: ${VERSION}</p>
        <ul>${rows}</ul>
      </body>
    </html>
  `);
});

// simple health check for pipeline/deploy verification
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', version: VERSION }));

app.get('/api/cars', (req, res) => res.json(cars));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Car Shop running on port ${PORT}, version ${VERSION}`));
}

module.exports = app;
