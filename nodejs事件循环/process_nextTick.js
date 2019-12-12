
// process.nextTick(()=>{
//     console.log('111')
// })

// console.log('222')

const fs = require('fs')
const path = require('path')
/*  不在eventloop里面的阶段执行  在阶段和阶段之间的间隙执行*/
fs.readFile(path.resolve(__dirname,'/read.txt'), () =>{
    setTimeout(()=>{
        console.log('setTimeout')
    },0)
    setImmediate(()=>{
        console.log('setImmediate')
        process.nextTick(()=>{
            console.log('nextTick3')
        })
    })
    process.nextTick(()=>{
        console.log('nextTick')
    })
    process.nextTick(()=>{
        console.log('nextTick2')
    })
})
/* 
  nextTick的应用场景常见有3种:
   1.在cpu密集型的任务中穿插运算 如果不使用nextTick cpu会一直阻塞在运算方法中
   2.保持回调函数的异步执行

*/