const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('listening', () => {
    const address = server.address()
    console.log(`server running ${address.address}:${address.port}`)

    server.setBroadcast(true)
    server.send('hello', 8000, '255.255.255.255')
    // 每隔两秒发送一条广告消息
    setInterval(function () {
        // 直接地址
        // 受限地址 255.255.255.255
        server.send('hello', 8000, '192.168.10.255')
    },2000)
})

server.on('message', (msg, remoteInfo) => {
    console.log(`server got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`)
    server.send('world', remoteInfo.port,remoteInfo.address)
})

server.on('error', err => {
    console.log('server error', err)
})

server.bind(3000)