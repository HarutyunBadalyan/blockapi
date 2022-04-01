const Router = require("koa-router");
const router = new Router();
const AuthController = require("../controller/AuthController");
const registerValidationMiddleware = require("../middlewares/registerValidationMiddleware");
const loginValidationMiddleware = require("../middlewares/loginValidationMiddleware")
const Auth = require("../middlewares/auth")
router.prefix("/api/v1/auth");

router.get("/register",Auth,(ctx) => ctx.body = {msg:"success"})
router.post("/register",registerValidationMiddleware, AuthController.register)
router.post("/login",loginValidationMiddleware, AuthController.login)
router.get("/token/:id", AuthController.verifyUser )
module.exports = router