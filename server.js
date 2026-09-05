const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.CAR_VERSION || 'v1';

const cars = [
  { name: 'StuCar Model 1', unique: '0-60 in 4.2s with revolutionary electric drivetrain', tagline: 'Sharp, quick, city-ready' },
  { name: 'StuCar Model 2', unique: 'Twin-turbo V8 with active aerodynamics', tagline: 'The one that turns heads' },
  { name: 'StuCar Model 3', unique: 'Spacious interior with advanced safety features', tagline: 'Everyday practical, still fun' },
  { name: 'StuCar Model 4', unique: 'Three rows of seating with all-terrain traction control', tagline: 'Room for the whole crew', image: '/images/suv.jpg' },
  { name: 'StuCar Model 5', unique: '2-ton towing capacity with reinforced steel bed', tagline: 'Built for the job site', image: '/images/pickup.jpg' },
  { name: 'StuCar Model 6', unique: 'Retractable hardtop in under 12 seconds', tagline: 'Top down, every weekend', image: '/images/convertible.jpg', imgWidth: 900, imgHeight: 450 },
];

app.get('/', (req, res) => {
  const cards = cars
    .map(
      (c) => `
      <div class="card">
        <div class="badge">StuCar</div>
        ${c.image ? `<img src="${c.image}" width="${c.imgWidth || 300}" height="${c.imgHeight || 180}" alt="${c.name}">` : ''}
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
            background: #0a0a0b;
            color: #e8e8ea;
          }
          header {
            padding: 32px 24px 20px;
            text-align: center;
            border-bottom: 1px solid #2b2b2d;
          }
          header h1 {
            margin: 0;
            font-size: 2.4rem;
            letter-spacing: 1px;
          }
          header h1 span { color: #c7cad0; }
          header p {
            margin: 6px 0 0;
            color: #8a8d92;
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
            background: #17181a;
            border: 1px solid #2b2b2d;
            border-radius: 14px;
            padding: 22px;
            width: 260px;
            text-align: center;
            transition: transform 0.15s ease, border-color 0.15s ease;
          }
          .card:hover {
            transform: translateY(-4px);
            border-color: #c7cad0;
          }
          .badge {
            display: inline-block;
            background: linear-gradient(135deg, #e2e4e8, #9a9ea5);
            color: #141516;
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
            color: #8a8d92;
            font-size: 0.85rem;
            margin: 0 0 14px;
          }
          .unique {
            font-size: 0.9rem;
            color: #c7cad0;
            font-weight: 600;
            margin: 0 0 16px;
          }
          button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #d7d9dc, #8f9299);
            color: #141516;
            font-weight: 600;
            cursor: pointer;
          }
          button:hover { background: linear-gradient(135deg, #eceded, #a3a6ad); }
          footer {
            text-align: center;
            color: #55585c;
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

module.exports = app;// trigger test
