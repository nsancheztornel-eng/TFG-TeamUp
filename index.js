// Team up - punto de entrada. Cada módulo de server/modules registra sus propias rutas.
const http = require('http');
const config = require('./config');
const openDb = require('./db');
const events = require('./lib/events');
const { Router, HttpError, serveStatic } = require('./lib/http');

const db = openDb(config.dbFile), router = new Router();
router.get('/api/stream', ({ req, res }) => { events.subscribe(req, res); });
['users', 'ideas', 'cards', 'messages'].forEach(m => require(`./modules/${m}`)({ db, router, events }));

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try { if (!(await router.handle(req, res, url))) serveStatic(config.publicDir, url, res); }
  catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    if (status === 500) console.error(e);
    if (!res.headersSent) { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: e.message })); }
  }
}).listen(config.port, () => console.log(`Team up en http://localhost:${config.port}`));
