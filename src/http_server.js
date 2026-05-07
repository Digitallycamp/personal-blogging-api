import http from 'http';
import url, { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
	const dbPath = path.join(__dirname, 'db', 'data.json');
	const method = req.method;
	const url = req.url;
	console.log(dbPath);
	switch (method) {
		case 'GET':
			if (url === '/') {
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end('Server live and rungung..');
			} else if (url === '/post') {
				fs.readFile(dbPath, (err, data) => {
					console.log(data);
					if (err) {
						res.statusCode = 500;
						return res.end('server error');
					}
					res.setHeader('Content-Type', 'application/json');
					res.end(data);
				});
			} else {
				res.statusCode = 404;
				res.end('GET route not found');
			}
			break;

		case 'POST':
			if (url === '/post') {
				let body = '';

				req.on('data', (chunk) => {
					body += chunk.toString();
				});

				req.on('end', () => {
					const newData = JSON.parse(body);
					console.log(newData);
					res.end(`POST received: ${JSON.stringify(newData)}`);
				});
			} else {
				res.statusCode = 404;
				res.end('POST route not found');
			}
			break;

		case 'PUT':
			if (url === '/post') {
				res.end('PUT request to /post');
			} else {
				res.statusCode = 404;
				res.end('PUT route not found');
			}
			break;

		case 'PATCH':
			if (url === '/post') {
				res.end('PATCH request to /post');
			} else {
				res.statusCode = 404;
				res.end('PATCH route not found');
			}
			break;

		default:
			res.statusCode = 405;
			res.end('Method Not Allowed');
	}
});

server.listen(process.env.PORT || 5001, () => {
	console.log(`sERVER RUNIMNG ON http://localhost:${process.env.PORT || 5001}`);
});
