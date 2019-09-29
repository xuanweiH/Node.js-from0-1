const net = require('net')

const types = require('./type')

let nickname = null

const client = net.createConnection({
    host: '127.0.0.1',
    port: 3000
})

client.on('connect', () => {
    console.log('成功的连接到服务器了')
    process.stdout.write('请输入昵称: ')
    // 客户端向服务端发信息
    process.stdin.on('data',data =>{
        data = data.toString().trim()
        if(!nickname) {
           return client.write(JSON.stringify({
                types: types.login,
                nickname: data
            }))
        }
        const matches = /^@(\w+)\s(.+)$/.exec(data)
        if (matches) { // 如果本次的消息符合@xxx xxx 格式
          return client.write(JSON.stringify({
              types: types.p2p,
              nickname: matches[1],
              message: matches[2]
          }))
        } 
        // 群聊
        client.write(JSON.stringify({
            types: types.broadcast,
            message: data
        }))
    })
    // client.write('hello i am client')
})
// 客户端监听 data事件,收到服务端发出的消息就会触发事件
client.on('data', data => {
   data = JSON.parse(data.toString().trim())
//    console.log(data.toString())
   switch (data.types) {
       case types.login:
           if (!data.success) {
               console.log(`登陆失败: ${data.message}`)
               process.stdout.write('请输入昵称: ')
           } else {
               console.log(`登陆成功,当前在线用户:${data.sumUsers}`)
               nickname = data.nickname
           }
            break
        case types.broadcast:
            console.log(`${data.nickname}:${data.message}`)
            break
        case types.p2p:
            if (!data.success) {
                return console.log(`发送失败: ${data.message}`)
            } 
            console.log(`${data.nickname} 对你说: ${data.message}`)
            break
        case types.log:
            console.log(data.message)
            break
        default:
            console.log('未知的消息类型')
            break
   }
//    console.log('服务端说:',data.toString())
})