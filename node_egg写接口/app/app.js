
// 动态创建
// module.exports = app => {
//     app.beforeStart(async () => {
//       // 从配置中心获取 MySQL 的配置
//       // { host: 'mysql.com', port: '3306', user: 'test_user', password: 'test_password', database: 'test' }
//       const mysqlConfig = await app.configCenter.fetch('mysql');
//       app.database = app.mysql.createInstance(mysqlConfig);
//     });
// };
module.exports = app => {
    app.once('server', server =>{
        console.log('http服务启动')
    })
    app.on('request', ctx => {
        console.log('======= request')
    })
    app.on('response', ctx =>{
        console.log('========= response')
    })
}