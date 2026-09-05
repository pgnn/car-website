const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.CAR_VERSION || 'v1';

app.use(express.static(path.join(__dirname)));

const cars = [
  { name: 'InnoCar Model 1', unique: 'Three rows of seating with all-terrain traction control', tagline: 'Room for the whole crew', image: '/images/suv.jpg' },
  { name: 'InnoCar Model 2', unique: '2-ton towing capacity with reinforced steel bed', tagline: 'Built for the job site', image: '/images/pickup.jpg' },
  { name: 'InnoCar Model 3', unique: 'Retractable hardtop in under 12 seconds', tagline: 'Top down, every weekend', image: '/images/convertible.jpg', imgWidth: 900, imgHeight: 450 },
];

app.get('/', (req, res) => {
  const cards = cars
    .map(
      (c) => `
      <div class="card">
        <div class="badge">InnoCar</div>
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
        <title>InnoCar</title>
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
          .fleet-section {
            padding: 60px 24px;
            background: linear-gradient(180deg, #0a0a0b 0%, #141516 100%);
            border-top: 1px solid #2b2b2d;
            text-align: center;
          }
          .fleet-header {
            max-width: 1000px;
            margin: 0 auto 40px;
          }
          .fleet-header h2 {
            margin: 0 0 12px;
            font-size: 2rem;
            letter-spacing: 0.5px;
          }
          .fleet-header p {
            color: #8a8d92;
            font-size: 0.95rem;
            margin: 0;
          }
          .fleet-stats {
            display: flex;
            gap: 30px;
            justify-content: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          .stat {
            background: #17181a;
            border: 1px solid #2b2b2d;
            border-radius: 12px;
            padding: 16px 24px;
            min-width: 150px;
          }
          .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            color: #d7d9dc;
            margin: 0;
          }
          .stat-label {
            font-size: 0.85rem;
            color: #8a8d92;
            margin: 6px 0 0;
          }
          #map {
            width: 100%;
            max-width: 900px;
            height: 400px;
            margin: 0 auto;
            border-radius: 14px;
            border: 1px solid #2b2b2d;
            background: #17181a;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          }
          svg { display: block; }
          .taxi-dot {
            fill: #d7d9dc;
            stroke: #e8e8ea;
            stroke-width: 1;
          }
          .taxi-dot:hover {
            fill: #e8e8ea;
          }
          .taxi-container {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .taxi-item {
            position: absolute;
            width: 16px;
            height: 16px;
            background: #d7d9dc;
            border: 2px solid #e8e8ea;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .taxi-item:hover {
            background: #e8e8ea;
            transform: scale(1.3);
          }
          .city-map {
            width: 100%;
            height: 100%;
            position: relative;
            background-image: url('/map.jpeg');
            background-size: cover;
            background-position: center;
            background-color: #17181a;
            overflow: hidden;
          }
          .city-streets {
            position: absolute;
            width: 100%;
            height: 100%;
            background: none;
          }
          .taxi-pins {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .taxi-pin {
            position: absolute;
            width: 14px;
            height: 14px;
            background: #ffd700;
            border: 2px solid #ffed4e;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
          }
          .taxi-pin:hover {
            width: 20px;
            height: 20px;
            margin-left: -3px;
            margin-top: -3px;
            box-shadow: 0 0 12px rgba(255, 215, 0, 0.9);
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Inno<span>Car</span></h1>
          <p>Build: ${VERSION}</p>
        </header>
        <div class="grid">${cards}</div>
        <div class="fleet-section">
          <div class="fleet-header">
            <h2>Frankfurt Autonomous Taxi Fleet</h2>
            <p>Real-time taxi locations across Frankfurt</p>
          </div>
          <div class="fleet-stats">
            <div class="stat">
              <p class="stat-value" id="taxi-count">0</p>
              <p class="stat-label">Available Taxis</p>
            </div>
            <div class="stat">
              <p class="stat-value">Frankfurt</p>
              <p class="stat-label">Service City</p>
            </div>
          </div>
          <div id="map"></div>
        </div>
        <footer>&copy; InnoCar Motors - demo build</footer>
        <script>
          async function loadTaxis() {
            try {
              const response = await fetch('/api/taxis');
              const taxis = await response.json();
              document.getElementById('taxi-count').textContent = taxis.length;

              const mapEl = document.getElementById('map');

              // Create city map
              const cityMap = document.createElement('div');
              cityMap.className = 'city-map';

              const streets = document.createElement('div');
              streets.className = 'city-streets';
              cityMap.appendChild(streets);

              const pins = document.createElement('div');
              pins.className = 'taxi-pins';

              // Place taxi pins
              taxis.forEach(taxi => {
                const pin = document.createElement('div');
                pin.className = 'taxi-pin';
                pin.title = taxi.id;

                // Map coordinates to percentages (x,y are 0-1000)
                const x = (taxi.x / 1000) * 100;
                const y = (taxi.y / 1000) * 100;

                pin.style.left = x + '%';
                pin.style.top = y + '%';
                pin.style.transform = 'translate(-50%, -50%)';

                pins.appendChild(pin);
              });

              cityMap.appendChild(pins);
              mapEl.appendChild(cityMap);
            } catch (err) {
              console.error('Error loading taxis:', err);
              document.getElementById('taxi-count').textContent = 'Error';
            }
          }

          window.addEventListener('load', loadTaxis);
        </script>
      </body>
    </html>
  `);
});

// simple health check for pipeline/deploy verification
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', version: VERSION }));

app.get('/api/cars', (req, res) => res.json(cars));

const taxis = [
  { "id": "TX001", "x": 120, "y": 150 },
  { "id": "TX002", "x": 450, "y": 200 },
  { "id": "TX003", "x": 780, "y": 320 },
  { "id": "TX004", "x": 200, "y": 400 },
  { "id": "TX005", "x": 650, "y": 250 },
  { "id": "TX006", "x": 350, "y": 500 },
  { "id": "TX007", "x": 900, "y": 150 },
  { "id": "TX008", "x": 100, "y": 700 },
  { "id": "TX009", "x": 550, "y": 600 },
  { "id": "TX010", "x": 750, "y": 450 },
  { "id": "TX011", "x": 300, "y": 250 },
  { "id": "TX012", "x": 850, "y": 700 },
  { "id": "TX013", "x": 450, "y": 750 },
  { "id": "TX014", "x": 200, "y": 850 },
  { "id": "TX015", "x": 680, "y": 800 },
  { "id": "TX016", "x": 950, "y": 500 },
  { "id": "TX017", "x": 100, "y": 300 },
  { "id": "TX018", "x": 600, "y": 100 },
  { "id": "TX019", "x": 380, "y": 650 },
  { "id": "TX020", "x": 750, "y": 200 },
  { "id": "TX021", "x": 520, "y": 400 },
  { "id": "TX022", "x": 880, "y": 350 },
  { "id": "TX023", "x": 200, "y": 600 },
  { "id": "TX024", "x": 700, "y": 550 },
  { "id": "TX025", "x": 420, "y": 900 },
  { "id": "TX026", "x": 300, "y": 100 },
  { "id": "TX027", "x": 800, "y": 600 },
  { "id": "TX028", "x": 150, "y": 500 },
  { "id": "TX029", "x": 600, "y": 850 },
  { "id": "TX030", "x": 900, "y": 750 }
];

app.get('/api/taxis', (req, res) => {
  res.json(taxis);
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`InnoCar running on port ${PORT}, version ${VERSION}`));
}

module.exports = app;// trigger test
