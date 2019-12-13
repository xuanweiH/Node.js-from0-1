const net = require('net')

const client = net.createConnection({
    host: '127.0.0.1',
    port: 3000
})
// node构建第二个客户端
client.on('connect', () => {
    console.log('成功的连接到服务器了')
    // 客户端向服务端发信息
    client.write('hello i am client1')
})
// 客户端监听 data事件,收到服务端发出的消息就会触发事件
client.on('data', data => {
   console.log('服务端说:',data.toString())
})