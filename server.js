// import http from 'http'; - ES6
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl); // convert relative path to absolute path .resolve
        const fileExt = path.extname(filePath); // parse out the extension

        if (fileExt === '.html') {
            fs.access(filePath, err => { // check if the file is in the server. 'access' method checks if the file is accessible in the server. if the file is not accessible, err will be pass to..
                if (err) { // here
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html'); // first, it tells the client what kind of data will expect from the body. second, sending html will set the header like this
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return; // return, so that code after this is not executed
                }
                res.statusCode = 200; // 200 means OK
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filePath).pipe(res); // reading the contents of the file that is given in small chunks. Ex) React Native: FlatList - lazy loading. 'pipe'
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => { // third one is callback function
    console.log(`Server running at http://${hostname}:${port}/`);
})