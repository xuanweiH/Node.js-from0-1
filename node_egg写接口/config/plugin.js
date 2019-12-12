'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enabled: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  // sequelize = {
  //   enable: true,
  //   package: 'egg-sequelize',
  // }
};
// // 开启插件
// exports.mysql = {
//   enabled: true,
//   package: 'egg-mysql',   
// };
// // 配置跨域
// exports.cors = {
//   enable: true,
//   package: 'egg-cors'
// }