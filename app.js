require("dotenv").config();
const PORT = process.env.PORT || 3000;
const Koa = require('koa');
const sequelize = require("./src/connections/db_connection")
const router = require('./src/routers/index');
const app = new Koa();
const koaBody = require("koa-body");
const cors = require('koa2-cors');
const serve = require('koa-static')
const Router = require('koa-router');
const send = require('koa-send');

const static_pages = new Router();
app.use(koaBody());
app.use(cors({origin:"*"}))

app.use(router.routes());



app.use(serve( "./build"));
static_pages.get("(.*)", async (ctx, next) => {
    try {
      console.log('sdfsdf')
      await send(ctx, './build/index.html');
    } catch(err) {
      console.log(err)
      // TODO: handle err?
      return next();
    }
  });
  app.use(static_pages.routes())
sequelize.authenticate().then(() => {
    console.log('Database connected successfully!');
}).catch(err => {
    console.log('Unable to connect database', err);
});

app.listen(PORT,()=>{
    console.log(`Server listen port ${PORT}`)
});