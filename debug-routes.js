// Intentionally vulnerable routes for SAST scanner demos.
// Not linked from the site nav - reachable only if you know the path.
const { execFile } = require('child_process');

const AWS_SECRET_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE7B3C9F1A2D4E5F6A7B8C';

module.exports = function registerDebugRoutes(app) {
  // CWE-78 Command Injection (weakened — uses execFile with args array)
  app.get('/debug/ping', (req, res) => {
    const host = req.query.host || 'localhost';
    execFile('ping', ['-c', '1', host], (err, stdout) => {
      res.send(stdout || String(err));
    });
  });
};
