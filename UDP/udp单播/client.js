const dgram = require('dgram')

const client = dgram.createSocket('udp4')

// client.send('hello', 3000, 'localhost')
//node构建udp单播客户端

client.on('listening', () => {
    const address = client.address()
    console.log(`client running ${address.address}:${address.port}`)
    
    client.send('hello', 3000, 'localhost')
})

client.on('message', (msg, remoteInfo) => {
    console.log(`client got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`)
})

client.on('error', err => {
    console.log('client error', err)
})

client.bind(8000)