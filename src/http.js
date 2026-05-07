import http from 'http';

PORT = process.env.PORT;
const server = http.createServer((req, res) => {
	console.log(req);
	res.end('Welcome to Node!!');
});

server.listen(PORT, () => {
	console.log(`Sever running http://localhost:${PORT}`);
});
