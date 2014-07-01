var Galileo = require('galileo-io');
var board = new Galileo();

board.on('ready', function() {
    console.log('Hello Galileo!');
});