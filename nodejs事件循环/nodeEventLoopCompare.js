

/* 
   在nodejs中 setTimeout 如果0s执行 相当于1ms之后执行
   在浏览器中 如果是0s 就相当于4ms之后执行
*/
// 不一定是谁先打印 取决于node eventloop的启动时间 如果时间长 先timeout 如果时间短就先immediate 因为这时候跳过了poll来到了check阶段
// setImmediate(function immediate(){
//     console.log('immediate')
// })


// setTimeout(function timeout(){
//     console.log('timeout')
// },0)


/* 尝试在nodejs环境下运行 */
const path = require('path')
const fs = require('fs')

fs.readFile(path.resolve(__dirname,'/read.txt'),() => {
    setTimeout(() => {
        console.log('setTimeout')
    },0)
    setImmediate(() => {
        console.log('setImmediate')
    })
})

/* 
timer
I/O callback
Idle 空闲
Poll 轮询
Check 只处理setImmediate
close Callbacks phase 专门处理close类型的回调
对于有node模块的fs来说
主要是poll阶段的理解:
1.如果poll队列不为空,event loop 将同步执行queue里的callback,直至queue为空,
或执行的callback到达系统上限;
2.如果poll队列为空,将会发生下面的情况:
  如果代码已经被setImmediate()设置了callback,event loop将结束poll阶段进入check阶段,check阶段执行setImmediate
  如果代码没有设定setImmediate(callback), event loop将阻塞在该阶段等待callbacks加入poll队列 一旦到达立即执行
3.如果event loop进入poll阶段,且代码设定了timmer
  如果poll queue进入空状态,eventloop将检查timers,如果有1个或者多个timers时间到达,eventloop将按循环顺序进入timer执行timerqueue 
*/
