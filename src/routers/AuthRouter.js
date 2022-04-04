const Router = require("koa-router");
const router = new Router();
const AuthController = require("../controller/AuthController");
const AuthValidation = require("../middlewares/authValidation")
const ProfileController = require("../controller/ProfileController")
router.prefix("/api/v1/auth");

router.post("/register",AuthValidation.registerValidation(), AuthController.register)
router.post("/login",AuthValidation.loginValidation(), AuthController.login)
router.get("/token/:id", AuthController.verifyUser )
router.get("/password/:id", ProfileController.verifyPassword)
module.exports = router