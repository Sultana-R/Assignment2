var fs=require('fs');
var http=require('http');
const url = require('url');
var multer=require('multer');

var server=http.createServer(function(req,res) {
    if (req.url == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h1>This is Home Page</h1>')

    }
    else if (req.url == "/about") {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h1>This is About Page</h1>')
    }
    else if (req.url == "/contact") {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h1>This is Contact Page</h1>')
    }
    else if (req.url == "/file-write") {
        fs.writeFile('demo.txt', 'Hello world!', function (error) {
            if (error) {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("File write fail");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("File write success");
            }
        });
    }
    else if (req.url== '/upload-file') {
        const upload = multer({ dest: 'uploads/' }).single('file');
        upload(req, res, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.write('Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('File uploaded successfully');
            }
        });
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('Not Found');
    }
res.end();
});
server.listen(5050);
console.log("Server run success");