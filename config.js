var serialport = require('serialport');

exports.serial = {
  PORT: '',
  serial_open: false,
  serial_opts: { 'baudrate':   9600,
                  'parser':     serialport.parsers.readline('\n') }

}

exports.badges = [
        {
            'name': 'Frank Sinatra',
            'id':   '6A003E6686B4',
        },
        {
            'name': 'Christopher Walken',
            'id':   '6A003E61BE8B'
        }
    ];

exports.doors = [
        {
            'name': 'Front Door',
            'can_open': ['6A003E6686B4', '6A003E61BE8B'],
            'state': 'closed'
        },
        {
            'name': 'Back Door',
            'can_open': ['6A003E6686B4'],
            'state': 'closed'
        }
    ];
