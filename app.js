
/**
 * Module dependencies.
 */

var express     = require('express');
var routes      = require('./routes');
var user        = require('./routes/user');
var http        = require('http');
var path        = require('path');

var serialport  = require('serialport'),
    PORT        = '/dev/ttyUSB0',
    serial_open = false,
    serial_opts = { 'baudrate':   9600, 
                    'parser':     serialport.parsers.readline('\n') };

serial = new serialport.SerialPort(PORT, serial_opts); 


var app = express(),
    http = require('http');
    server = http.createServer(app),
    io = require('socket.io').listen(server);


var badges = [
        {
            'name': 'Frank Sinatra',
            'id':   '6A003E6686B4',
        },
        {
            'name': 'Christopher Walken',
            'id':   '6A003E6686B4'
        }
    ];

var doors = [
        {
            'name': 'Front Door',
            'can_open': ['6A003E6686B4', '6A003E6686B4'],
            'state': 'closed'
        },
        {
            'name': 'Back Door',
            'can_open': ['6A003E6686B4'],
            'state': 'closed'
        } 
    ];


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app),
    io = require('socket.io').listen(server, { 'log': false });

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// open serial port and then process the barcode
serial.on('open', function() {
    serial_open = true;
    console.log('Opened serial port ', PORT);
    serial.on('data', function(data) {
        console.log('Data: ', data);
        io.sockets.emit('event', { 'scan': data })
    });
});

// handle serial port closing
serial.on('close', function() {
    serial.open = false;
    console.log('CLosed serial port ', PORT);
})

// real time stuff

function emit_current_state(socket) {
    io.sockets.emit('current_state', { 'doors': doors });
};

io.sockets.on('connection', function(socket) { emit_current_state(socket) });
io.sockets.on('update', function(socket) { emit_current_state(socket) });

