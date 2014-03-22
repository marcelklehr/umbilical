# umbilical
Bidirectional rpc between your node.js processes.

`npm install umbilical`

```js
// "Server"

var umbilical = require('umbilical')

var server = umbilical.endpoint({port: 1337},
{ add: function(a, b, cb) {
    cb(null, a+b)
  }
, mul: function(a,b, cb) {
    cb(null, a*b)
  }
}
, function(client) {

  client.request('hello', function(er, res) {
    console.log(res)
  })

})
```

```js
// "Client"

var umbilical = require('umbilical')

var server = umbilical({port: 1337},
{ hello: function(cb) {
      cb(null, 'oh, be quiet, already!')
  }
})

server.request('mul', 5, 6, function(er, res) {
  if(er) throw new er
  console.log8('5 * 6 =', res)
})
```

## License
Copyright (c) Marcel Klehr

MIT License