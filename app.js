require("dotenv").config()
const Koa = require('koa');
const sequelize = require("./src/connections/db_connection")
const router = require('./src/routers/index');
const app = new Koa();
const koaBody = require("koa-body");
const cors = require('koa2-cors');
app.use(koaBody());
app.use(router.routes());
app.use(cors({origin:"*"}))
const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
    console.log('Database connected successfully!');
}).catch(err => {
    console.log('Unable to connect database', err);
});

app.listen(PORT,()=>{
    console.log(`Server listen port ${PORT}`)
});