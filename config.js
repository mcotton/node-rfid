var serialport = require('serialport');

exports.serial = {
  PORT: '',
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
      'can_open': ['6A003E6686B4', '6A003E61BE8B'],
      'state': 'closed'
  }
};
