const net = require('net')
const types = require('./type')
const server = net.createServer()

// const clients = []
const users = []
server.on('connection',clientSocket =>{
    console.log('有连接进来了')
    // 把通信接口存储到数据中
    // clients.push(clientSocket)
    // 监听data事件
    clientSocket.on('data', data =>{
        data = JSON.parse(data.toString().trim())
        switch (data.types) {
            case types.login:
                if (users.find(item => item.nickname === data.nickname)) {
                    return clientSocket.write(JSON.stringify({
                        types: types.login,
                        success: false,
                        message: '昵称已重复'
                    }))
                }
                clientSocket.nickname = data.nickname
                users.push(clientSocket)
                clientSocket.write(JSON.stringify({
                    types: types.login,
                    success: true,
                    message:'登陆成功',
                    nickname: data.nickname,
                    sumUsers: users.length
                }))
                users.forEach(user => {
                    if (user !== clientSocket) {
                       user.write(JSON.stringify({
                           types: types.log,
                           message: `${data.nickname} 进入了聊天,当前在线用户: ${users.length}`
                       }))
                    }
                })
                break
            case types.broadcast:
                users.forEach(item => {
                    item.write(JSON.stringify({
                        types: types.broadcast,
                        nickname: clientSocket.nickname,
                        message: data.message
                    }))
                })
                break
            case types.p2p:
                const user = users.find(item => item.nickname === data.nickname)
                if (!user) {
                   return clientSocket.write(JSON.stringify({
                       types: types.p2p,
                       success: false,
                       message:'该用户不存在'
                   }))
                }
                user.write(JSON.stringify({
                    types: types.p2p,
                    success: true,
                    nickname: data.nickname,
                    message: data.message
                }))
                break
            default:
                break
        }
    })
    clientSocket.on('end', () =>{
      console.log('有用户离开了')
      const index = users.findIndex(user => user.nickname)
      if (index !== -1) {
          const offlineUser = users[index]
          users.splice(index,1)
          // 广播通知其他用户. xxx用户已离开, 当前剩余人数:xx
          users.forEach(user =>{
              user.write(JSON.stringify({
                  types: types.log,
                  message: `${offlineUser.nickname} 离开了聊天室`
              }))
          })
      }
    })
    // clientSocket.write('hello')
})
server.listen('3000',() => {
    console.log('server running...')
})