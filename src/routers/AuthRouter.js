const Router = require("koa-router");
const router = new Router();
const AuthController = require("../controller/AuthController");
const registerValidationMiddleware = require("../middlewares/registerValidationMiddleware");
const loginValidationMiddleware = require("../middlewares/loginValidationMiddleware")

router.prefix("/api/v1/auth");

router.post("/register",registerValidationMiddleware, AuthController.register)
router.post("/login",loginValidationMiddleware, AuthController.login)

module.exports = router