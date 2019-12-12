const http = require('http')

http.createServer((req, res) => {
    res.end('hello')
}).listen(8000, ()=>{
    console.log('xxx', + 8000)
})

/* 多个线程组成一个进程 
 每个窗口就是一个进程, 渲染线程 js执行线程 垃圾回收*/

 /* node 
   主线程
   编译线程
   profiler线程
   其他线程
 */