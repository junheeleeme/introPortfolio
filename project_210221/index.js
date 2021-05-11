const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 8080;

const web = http.createServer(function(req, res){
    let url = req.url;
    console.log(url);
    if(url === '/'){
        url = '/index.html';
    }
    if(url === '/favicon.ico'){
        return res.writeHead(404);
    }
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

web.listen(port);



