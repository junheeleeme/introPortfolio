const express = require('express');
const path = require('path');
const web = express();

const http = require('https').createServer(web);
const port = 8080;

web.use('/', express.static(path.join(__dirname)));
web.use('/tetris', express.static(path.join(__dirname, '/pofol/tetris')));
web.use('/todo', express.static(path.join(__dirname, '/pofol/todo')));


web.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'))
    console.log(__dirname)
})

web.get('/tetris', function(req, res){
    res.sendFile(path.join(__dirname, 'pofol/tetris/tetris.html'))
})

web.get('/todo', function(req, res){
    res.sendFile(path.join(__dirname, 'pofol/todo/index.html'))
})


web.listen(port, () => {
    console.log('Express App on port ' + port + '!');
});

