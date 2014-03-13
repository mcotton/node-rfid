
/**
 * Module dependencies.
 */

var express     = require('express');
var routes      = require('./routes');
var user        = require('./routes/user');
var http        = require('http');
var path        = require('path');

var serialport  = require('serialport');

var config = require('./config.js');

var serial;
if(config.serial.PORT) {
  serial = new serialport.SerialPort(config.serial.PORT, config.serial.serial_opts);
} else {
  console.log('WARNING: config.js doesn\'t define a serial port, continuing without it')
}

var app = express(),
    http = require('http');
    server = http.createServer(app),
    io = require('socket.io').listen(server, { log: false });


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


// check if serial has been defined
if(serial) {
  // open serial port and then process the barcode
  serial.on('open', function() {
      config.serial.serial_open = true;
      console.log('Opened serial port ', config.serial.PORT);
      serial.on('data', function(data) {
          // test if it looks like a badge
          if((/6A[A-z0-9]*/).test(data)) {
              data = data.match(/6A[A-z0-9]*/)[0];
              console.log('Data: ' + data + ' length: ' + data.length);
              io.sockets.emit('event', {
                  'badge': data,
                  'badgeName': badgeName(data),
                  'status': checkPermission(data) ? 'authorized' : 'rejected',
                  'timestamp': new Date(),
                  'door': config.serial.DOOR
              });
          }
      });
  });

  // handle serial port closing
  serial.on('close', function() {
      config.serial.serial_open = false;
      console.log('CLosed serial port ', config.serial.PORT);
  })

}

function badgeName(id) {
  return (config.badges[id]) ? config.badges[id].name : undefined;
}

function checkPermission(id) {
  return (config.doors[config.serial.DOOR].can_open.indexOf(id) > -1) ? true : false;
}


// real time stuff
function emit_current_state(socket) {
    io.sockets.emit('current_state', { 'doors': config.doors[config.serial.DOOR] });
};

io.sockets.on('connection', function(socket) { emit_current_state(socket) });
io.sockets.on('update', function(socket) { emit_current_state(socket) });
