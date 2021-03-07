const express = require('express'),
bodyParser = require('body-parser'),
session = require('express-session'),
app = express();


const {config, session, cros} = require('./config'),
{urlencoded} = require('express');

app.listen(config.port, ()=>{
  console.log('开启服务监听', config.port)
})

// 中间件的处理

// cros跨域请求中间件
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', cros.origin);
  res.header('Access-Control-Allow-Credentials', cros.credential);
  res.header('Access-Control-Allow-Headers', cros.headers);
  res.header('Access-Control-Allow-Methods', cros.methods);
  /^OPTIONS$/i.test(req.method) ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!'): next()
})

app.use(bodyParser({
  extended:false
}));

app.use(session(config.session));
// 以后获取session: require.session.XXX
// 以后设置session: require.session.XXX = XX

// api处理
app.use('/user', require('./routes/user'));

app.use('/login',require('./routes/user'))


app.use((req, res)=>{
  res.status(404).send({
    code: 1,
    codeText: 'not found' 
  })
})