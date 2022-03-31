require("dotenv").config();
const PORT = process.env.PORT || 3000;
const Koa = require('koa');
const sequelize = require("./src/connections/db_connection")
const router = require('./src/routers/index');
const app = new Koa();
const koaBody = require("koa-body");
const cors = require('koa2-cors');
const serve = require('koa-static')
const mount = require("koa-mount");
const static_pages = new Koa();
app.use(koaBody());
app.use(cors({origin:"*"}))
app.use(router.routes());
app.use((ctx) => {    ctx.body = "hello"}) //this will be removed


static_pages.use(serve(__dirname + "/build"));
app.use(mount('/', static_pages));
app.use(mount('/register', static_pages));
app.use(mount('/profile', static_pages));
sequelize.authenticate().then(() => {
    console.log('Database connected successfully!');
}).catch(err => {
    console.log('Unable to connect database', err);
});

app.listen(PORT,()=>{
    console.log(`Server listen port ${PORT}`)
});