const Router = require("koa-router");
const router = new Router();
const ForgetPasswordController = require("../controller/ForgetPasswordController");
const EditValidation = require("../middlewares/editValidation")
router.prefix("/api/v1/forgetpassword");

router.post("/",EditValidation.sendVerificationValidation(),ForgetPasswordController.sendVerificationMessage)
router.get("/:id",ForgetPasswordController.verifyLink)
router.post("/:id",EditValidation.resetPasswordValidation(),ForgetPasswordController.resetPassword)
module.exports = router