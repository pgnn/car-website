const { execFile } = require('child_process');

const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';

const VALID_HOSTNAME = /^[a-zA-Z0-9]([a-zA-Z0-9\-\.]{0,253}[a-zA-Z0-9])?$/;

module.exports = function registerDebugRoutes(app) {
  app.get('/debug/ping', (req, res) => {
    const host = req.query.host || 'localhost';
    if (!VALID_HOSTNAME.test(host)) {
      return res.status(400).send('Invalid hostname');
    }
    execFile('ping', ['-c', '1', host], (err, stdout) => {
      res.send(stdout || String(err));
    });
  });
};
