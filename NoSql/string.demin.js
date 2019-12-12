const redis = require('redis')
let client = new redis({
   // 配置

})

let $post_id = client.incr('post:count')

// 字符串类型
var $
