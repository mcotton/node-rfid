#### Introduction ####

This project is using a RFID reader as a access control system.  It will run on most any computer (or raspberry pi) that can run Node.js

It uses Socket.io to notify the webclient in real-time when a badge is scanned.  It has simple rules that can be setup in config.js and is easily extended to multiple doors/readers.

#### Usage ####

 - clone this repo
 -  `npm install`
 -  edit `config.js` to user your RFID readers and badges
 -  `node app.js`



#### Future Plans ####

The reason for making this is show off the Eagle Eye Networks API and how to integrate security video.  Each card read will get a jpeg image from the camera that covers that door and link to the full video for that time will be available.


#### Hints ####

If you are getting annoyed with the beep from the RFID reader, you can simulate a badge being scanned by sending this from the client.  Obviously you'll need to change the badge id to something in your system.

    socket.emit('test', {'id': '6A003E6686B4'})
    
  
  #### Demo ####
  
[demo on youtube](http://www.youtube.com/watch?v=BkN5POzb_pI)
