const http = require('http')
const template = require('art-template')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    const url = req.url
    if(url === '/') {
        fs.readFile('./index2.html',(err,data)=>{
            if(err) {
                throw err 
            }
            const htmlStr = template.render(data.toString(),{
                message: 'World',
                todos: [
                    {title:'吃饭', completed:false},
                    {title:'睡觉', completed:true},
                    {title:'打豆豆', completed:false},
                ]
            })
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            res.end(htmlStr)
            // res.end('Hello World\n')
        })
    }
   
})
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})