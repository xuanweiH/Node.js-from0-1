const dgram = require('dgram')

const server = dgram.createSocket('udp4')
// node构建udp 组播服务端
server.on('listening', () => {
    const address = server.address()
    console.log(`server running ${address.address}:${address.port}`)
    
    // 每隔两秒发送一条广告消息
    setInterval(function () {
        // 直接地址
        // 受限地址 255.255.255.255
        server.send('hello', 8000, '224.0.1.100')
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