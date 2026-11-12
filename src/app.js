//import fs from 'fs';

const fs = require('fs');

const http = require('http');

const server = http.createServer((req, res) => {
if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome User!\n');

    fs.writeFileSync('../text_files/home.txt', 'Homepage visited','utf8');
}
else if (req.url === '/about'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to the about!\n');

    fs.writeFileSync('../text_files/about.txt', 'About page visited','utf8');
}
    
});

server.listen(3000, 'localhost', () => {
    console.log(`Server running at http://localhost:3000/`);
});