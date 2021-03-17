const express = require('express'),
  route = express.Router();
User = require('../module/jdbc')

const { readFile, writeFile } = require('../myFs/myFs'),
  { responseInfo, againMd5 } = require('../util/util');
// 可以理解route和创建的app没有区别

// 正常登陆
route.post('/login', (req, res, next) => {
  console.log(req)
  let { name, password } = req.body
  // 对密码进行二次加密
  console.log(name, password, '-----')
  if (name == 'zou' && password == '123456') {
    responseInfo(res, {
      code: 1,
      codeText: '成功啦'
    });
    return
  }
  responseInfo(res, {
    code: 2,
    codeText: '失败'
  })
});


module.exports = route