const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.CAR_VERSION || 'v1';

const cars = [
  { name: 'StuCar Roadster', unique: '0-60 in 4.2s with revolutionary electric drivetrain', tagline: 'Sharp, quick, city-ready' },
  { name: 'StuCar GT', unique: 'Twin-turbo V8 with active aerodynamics', tagline: 'The one that turns heads' },
  { name: 'StuCar Hatch', unique: 'Spacious interior with advanced safety features', tagline: 'Everyday practical, still fun' },
];

app.get('/', (req, res) => {
  const cards = cars
    .map(
      (c) => `
      <div class="card">
        <div class="badge">StuCar</div>
        <h2>${c.name}</h2>
        <p class="tagline">${c.tagline}</p>
        <p class="unique">${c.unique}</p>
        <button>More Information</button>
      </div>`
    )
    .join('');

  res.send(`
    <html>
      <head>
        <title>StuCar</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, Segoe UI, Roboto, sans-serif;
            background: #0f1115;
            color: #f3f3f3;
          }
          header {
            padding: 32px 24px 20px;
            text-align: center;
            border-bottom: 1px solid #23262f;
          }
          header h1 {
            margin: 0;
            font-size: 2.4rem;
            letter-spacing: 1px;
          }
          header h1 span { color: #e63946; }
          header p {
            margin: 6px 0 0;
            color: #9a9ea8;
            font-size: 0.85rem;
          }
          .grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            padding: 36px 24px;
            max-width: 1000px;
            margin: 0 auto;
          }
          .card {
            background: #181b22;
            border: 1px solid #262a33;
            border-radius: 14px;
            padding: 22px;
            width: 260px;
            text-align: center;
            transition: transform 0.15s ease, border-color 0.15s ease;
          }
          .card:hover {
            transform: translateY(-4px);
            border-color: #e63946;
          }
          .badge {
            display: inline-block;
            background: #e63946;
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            padding: 3px 10px;
            border-radius: 999px;
            margin-bottom: 10px;
          }
          .card h2 {
            margin: 0 0 6px;
            font-size: 1.3rem;
          }
          .tagline {
            color: #9a9ea8;
            font-size: 0.85rem;
            margin: 0 0 14px;
          }
          .unique {
            font-size: 0.9rem;
            color: #e63946;
            font-weight: 600;
            margin: 0 0 16px;
          }
          button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 8px;
            background: #e63946;
            color: white;
            font-weight: 600;
            cursor: pointer;
          }
          button:hover { background: #ff4b58; }
          footer {
            text-align: center;
            color: #5a5f6b;
            font-size: 0.75rem;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Stu<span>Car</span></h1>
          <p>Build: ${VERSION}</p>
        </header>
        <div class="grid">${cards}</div>
        <footer>&copy; StuCar Motors - demo build</footer>
      </body>
    </html>
  `);
});

// simple health check for pipeline/deploy verification
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', version: VERSION }));

app.get('/api/cars', (req, res) => res.json(cars));

if (require.main === module) {
  app.listen(PORT, () => console.log(`StuCar running on port ${PORT}, version ${VERSION}`));
}

module.exports = app;