/* console.log(__dirname)   // /nodejs事件循环
console.log(__filename) // /nodejs事件循环/nodejsloop.js */


const fs = require('fs')
const path = require('path')

/* 理解nodejs的运行机制 */

function someAsyncOperation (callback) {
    // 花费Xms
    fs.readFile(path.resolve(__dirname,'/read.txt'),callback)
}

var timeoutScheduled = Date.now()
var fileReadTime = 0

setTimeout(function() {
    var delay = Date.now() - timeoutScheduled
    console.log('setTimeout:'+delay+'ms have passed since I was scheduled')
    // console.log('timeoutScheduled', timeoutScheduled)
    // console.log('fileReadTimereal', fileReadTime)
    console.log('fileReadTime',fileReadTime - timeoutScheduled)
},10)

someAsyncOperation(function(){
    fileReadTime = Date.now()
    // console.log('fileReadTime1',Date.now() - fileReadTime)
    while (Date.now() - fileReadTime <20) {

    }
    // console.log('fileReadTime2',Date.now() - fileReadTime)
})