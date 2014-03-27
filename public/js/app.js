var socket = io.connect('http://192.168.11.59:3000');

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
    var template_src = $('#message_template');
    var html_output = _.template(template_src.html(), { 'data': data })
    $('#scan_history').prepend(html_output)
});
