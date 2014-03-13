var serialport = require('serialport');

exports.serial = {
  PORT: '/dev/tty.usbserial-AD026AOP',
  DOOR: 'Front Door',
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
  }
};

exports.doors = {
  'Front Door': {
      'building': 1,
      'can_open': ['6A003E6686B4'],
      'state': 'closed'
  }
};
