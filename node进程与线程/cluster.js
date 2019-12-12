/* cluster 开启多进程 */

const cluster = require('cluster') // nodejs核心模块

const http = require('http')

const cpu = require('os').cpus().length // 获取cpu的核数

// cluster 基本原理 就是主线程去fork子线程 然后管理他们

console.log(cpu)

if(cluster.isMaster) { // 如果你是主线程
    
    for (let i =0;i < cpu;i++) {
        cluster.fork()  // 核的数量决定开启几个子线程
    }
} else { // 子线程走下面
    http.createServer((req, res) => {
        res.end('hello')
    }).listen(8000, ()=>{
        console.log('server is listening' + 8000)
    })
    
}