
var serialport  =   require('serialport'),
    PORT        =   '/dev/ttyUSB0',
    serial_opts =   { 'baudrate':   9600, 
                      'parser':     serialport.parsers.readline('\n') };

serial = new serialport.SerialPort(PORT, serial_opts); 

serial.on('open', function() {
    console.log('Opened serial port ', PORT);
    serial.on('data', function(data) {
        console.log('Data: ', data);
    });
});
