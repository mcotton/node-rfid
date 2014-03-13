var socket = io.connect('http://192.168.11.55:3000');

socket.on('current_state', function (data) {
   console.log(data);
});

socket.on('connect', function(data) {
   document.title = document.title.replace(' :)','')
                                  .replace(' :(','')
                                  .replace(' :o','') + ' :)'
});

socket.on('connecting', function(data) {
   document.title = document.title.replace(' :)','')
                                  .replace(' :(','')
                                  .replace(' :o','') + ' :o'
});

socket.on('disconnect', function(data) {
  document.title = document.title.replace(' :)','')
                                 .replace(' :(','')
                                 .replace(' :o','') + ' :('
});

socket.on('event', function(data) {
    var item = document.createElement('li');
    item.textContent = [ data.door, data.status, data.badgeName].join(' ');
    document.getElementById('scan_history').appendChild(item);
});
