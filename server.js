const bodyParser = require('body-parser'),
  express = require('express'),
  session = require('express-session'),
  app = express();


const config = require('./config'),
  loginRoute = require('./routes/user'),
  { urlencoded } = require('express');

app.listen(config.port, () => {
  console.log('开启服务监听', config.port)
})

// 中间件的处理

// cros跨域请求中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.cros.origin);
  res.header('Access-Control-Allow-Credentials', config.cros.credential);
  res.header('Access-Control-Allow-Headers', config.cros.headers);
  res.header('Access-Control-Allow-Methods', config.cros.methods);
  /^OPTIONS$/i.test(req.method) ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next()
})

app.use(bodyParser.urlencoded({
  extended: false
}));

//配置post请求中的bodyParser，可以直接使用req.body-req.query
app.use(bodyParser.json())


app.use(session(config.session));
// 以后获取session: require.session.XXX
// 以后设置session: require.session.XXX = XX

// api处理

app.post('/login', loginRoute);


app.use((req, res) => {
  res.status(404).send({
    code: 1,
    codeText: 'not found'
  })
})