const http = require('http')
const fs = require('fs')
const mime = require('mime')
const path = require('path')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    const url = req.url
    if (url === '/') {
        fs.readFile('./index.html',(err, data) =>{
            if (err) {
                throw err
            }
            res.statusCode = 200
            res.setHeader('Content-type','text/html; charset=utf-8');
            res.end(data)
        })
    } else if (url.startsWith('/assets/')) {
        fs.readFile(`.${url}`,(err, data) =>{
            if (err) {
                res.statusCode = 404 
                res.setHeader('Content-type','text/plain; charset=utf-8');
                res.end('404 Not Found.')
            }
            const contentType = mime.getType(path.extname(url)) // path.extname解析文件名
            res.statusCode = 200
            res.setHeader('Content-type',contentType);
            res.end(data)
        })
    } else {
        res.statusCode = 404 
        res.setHeader('Content-type','text/plain; charset=utf-8');
        res.end('404 Not Found.')
    }
    
   
    // res.end(`
    // <h1>Hello world!</h>
    // <p>三十功名尘与土</p>
    // <p>八千里路云和月</p>
    // `)


    // const url = req.url
    // if (url === '/') {
    //     res.end('hello world')
    // } else if (url === '/a') {
    //     res.end ('hello a!')
    // } else if (url === '/b') {
    //     res.end ('hello b!')
    // } else {
    //     res.statusCode = 404 // 返回的状态码
    //     res.end('404 Not Found.')
    // }
})

server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}/`)
})