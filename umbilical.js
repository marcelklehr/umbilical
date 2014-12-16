var net = require('net')
  , rpc = require('p2p-rpc-stream')

module.exports = Umbilical

function Umbilical(opts, interface) {
  if(!opts.port) throw new Error('No port specified')
  var port = opts.port
    , address = opts.address
  
  var socket = net.connect(port, address)
  
  var server, client
  
  socket
    .pipe((server = rpc.createServer(interface)).createStream())
    .pipe(client = rpc.createClient(server.id))
    .pipe(socket)
  
  socket.on('error', function(err) {
    client.emit('error', err)
  })

  return client
}

Umbilical.endpoint = function(opts, interface, fn) {
  if(!opts.port) throw new Error('No port specified')
  var port = opts.port
    , address = opts.address
  
  var server = net.createServer(function(socket) {
    socket
      .pipe((server = rpc.createServer(interface)).createStream())
      .pipe(client = rpc.createClient(server.id))
      .pipe(socket)
    
    socket.on('error', function(err) {
      client.emit('error', err)
    })

    fn(client)
  }).listen(port, address)
  
  return server
}