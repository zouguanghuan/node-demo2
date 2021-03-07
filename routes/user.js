const express = require('express'),
route = express.Router();

const {readFile, writeFile} = require('./myFs/myFs'),
{responseInfo, againMd5} = require('./util/util');
// 可以理解route和创建的app没有区别
route.use(async  (req, res, next)=>{
 req.$USER = await readFile('./mock/user.json');
 req.$USER = JSON.parse(req.$USER);
 next();
})
// 正常登陆
route.post('/login',async  (req, res, next)=>{
  let {name, password, type = 1} = res.body
  // 对密码进行二次加密
  password = againMd5(password)
})


module.exports = {
  route
}