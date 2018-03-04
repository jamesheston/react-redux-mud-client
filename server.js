let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let fs = require('fs')
let net = require('net')
let express = require('express')
let serverConfig = require('./src/config/serverConfig.json')
const uuidv4 = require('node-uuid') // all MSG action ids should be generated using `uuidv4()`


const createResponse = (command, data) => ({
  command,
  data
})

const mudServerAddress = serverConfig.mudServerAddress // `mume.org`
const mudServerPort = serverConfig.mudServerPort // `4242`
const websocketsPort = serverConfig.websocketsPort // `3002`

io.on('connection', (socket) => {
  console.log('socket.io connection started')
  // socket.emit( 'action', {type: 'APP_MSG', data: 'Websockets connection initiated. Attempting to connect to MUD server...'} )

  let mud = net.createConnection(mudServerPort, mudServerAddress, () => {
    console.log('Successfully connected to ' + mudServerAddress + ':' + mudServerPort)
  }) 
  
  mud.setEncoding('utf8')
  
  let uniqueIdIterator = 1

  mud.addListener('data', (data) => { // MUD server output
    console.log(data)
    const id = uuidv4()

    socket.emit( 'action', 
      {type: 'MUD_OUTPUT_MSG', id: id, data: data} 

    )
  })

  socket.on('action', (action) => {
    if(action.type === 'MUD_WRITE_MSG') {
      console.log('MUD_WRITE_MSG action.data')
      console.log(action.data)
      mud.write(action.data + '\r\n')// If you don't include the readline char, sent message isn't picked up by remote MUD server
    }
  })
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

})

http.listen(websocketsPort, () => {
  console.log('Listening on *:' + websocketsPort)
})