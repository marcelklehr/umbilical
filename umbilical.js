var smokesignal = require('net')
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
  
  return client
}

Umbilical.endpoint = function(opts, interface) {
  if(!opts.port) throw new Error('No port specified')
  var port = opts.port
    , address = opts.address
  
  var socket = net.createServer(function() {
    socket
      .pipe((server = rpc.createServer(interface)).createStream())
      .pipe(client = rpc.createClient(server.id))
      .pipe(socket)
  }.listen(port, address)
  
  return client
}