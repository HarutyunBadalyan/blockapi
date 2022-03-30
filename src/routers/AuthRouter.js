const Router = require("koa-router");
const router = new Router();
const AuthController = require("../controller/AuthController")


router.prefix("/api/v1/auth");

router.post("/register", AuthController.register)
// routers.post("/login", AuthController.login)

module.exports = router