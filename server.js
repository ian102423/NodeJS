// import http from 'http'; - ES6
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.headers); // just to see what its like
    res.statusCode = 200; // means everything is okay
    res.setHeader('Content-Type', 'text/html') // first, it tells the client what kind of data will expect from the body. second, sending html will set the header like this
    res.end('<html><body><h1>Hello World!</h1></body></html>');
});

server.listen(port, hostname, () => { // third one is callback function
    console.log(`Server running at http://${hostname}:${port}/`);
})