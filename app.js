require("dotenv").config()
const Koa = require('koa');
const sequelize = require("./src/connections/db_connection")
const app = new Koa();




const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
    console.log('Database connected successfully!');
}).catch(err => {
    console.log('Unable to connect database', err);
});

app.listen(PORT,()=>{
    console.log(`Server listen port ${PORT}`)
});