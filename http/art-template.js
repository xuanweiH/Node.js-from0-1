/*
 直接node运行art-template.js文件 可以看到 template.render函数的效果 展示出对应的模板引擎渲染出来的html效果 
 template.render(`html`,{data})
*/


const template = require('art-template')

const tem =  template.render(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
  <h1>{{message}}</h1>
  <ul>
    {{each todos}}
    <li>{{ $value.title }} <input type="checkbox" {{ $value.completed ? 'checked':''}} /></li>
    {{/each}}
  </ul>
</body>
</html>    
`, {
    message: 'World',
    todos: [
        {title:'吃饭', completed:false},
        {title:'睡觉', completed:true},
        {title:'打豆豆', completed:false},
    ]
})

console.log(tem)
