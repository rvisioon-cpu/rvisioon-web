import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), port=8766, types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webm':'video/webm'};
http.createServer((req,res)=>{const u=decodeURIComponent((req.url||'/').split('?')[0]);const file=path.join(root,u==='/'?'index.html':u.replace(/^\//,''));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end('Not found');return}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)}).listen(port,'127.0.0.1');
