const Router = require("koa-router");
const router = new Router();
const AuthController = require("../controller/AuthController");
const registerValidationMiddleware = require("../middlewares/registerValidationMiddleware");


router.prefix("/api/v1/auth");

router.post("/register",registerValidationMiddleware, AuthController.register)
router.post("/login", AuthController.login)

module.exports = router