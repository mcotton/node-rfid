var serialport = require('serialport');

exports.username = 'username'
exports.password = 'password'

// extra logging while in development mode
exports.debug = true;

// TODO: put this information in doors object and allow multiple doors/readers
exports.serial = {
  //PORT: '/dev/tty.usbserial-AD026AOP', // mac
  //PORT: '/dev/ttyUSB0', // raspberry pi
  PORT: '',
  DOOR: 'Front Door',
  CAMERA: '10042ffd',
  serial_open: false,
  serial_opts: { 'baudrate':   9600,
                  'parser':     serialport.parsers.readline('\n') }

}

exports.badges = {
  '6A003E6686B4': {
    'name': 'Frank Sinatra',
    'id':   '6A003E6686B4'
  },
  '6A003E61BE8B': {
    'name': 'Christopher Walken',
    'id':   '6A003E61BE8B'
  },
  '6F005C77EEAA': {
    'name': 'Nicola Tesla',
    'id':   '6F005C77EEAA'
  },
  '6F005C8ADB62': {
    'name': 'Pablo Picaso',
    'id':   '6F005C8ADB62'
  }
};

exports.doors = {
  'Front Door': {
      'building': 1,
      'can_open': ['6A003E6686B4','6F005C8ADB62'],
      'state': 'closed'
  }
};
