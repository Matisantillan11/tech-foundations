const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.ttf':'font/ttf','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Solicitud inválida'); return; }
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  const allowed = ['index.html','styles.css','app.js','content.js','source/notes.js'].includes(relative) || relative.startsWith('assets/');
  const file = path.resolve(root, relative);
  if (!allowed || !file.startsWith(root + path.sep)) { res.writeHead(404); res.end('No encontrado'); return; }
  fs.readFile(file, (error,data) => {
    if (error) { res.writeHead(404); res.end('No encontrado'); return; }
    res.writeHead(200, {'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    res.end(data);
  });
}).listen(port,'127.0.0.1', () => console.log(`Tech Foundations → http://localhost:${port}`))
  .on('error', error => { console.error(error.code === 'EADDRINUSE' ? `El puerto ${port} está ocupado. Probá: PORT=3001 npm start` : error.message); process.exitCode=1; });
