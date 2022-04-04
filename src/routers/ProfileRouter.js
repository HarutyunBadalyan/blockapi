const Router = require("koa-router");
const router = new Router();
const ProfileController = require("../controller/ProfileController")
const EditValidation = require("../middlewares/editValidation")
router.prefix("/api/v1/profile");

router.get("/", ProfileController.get);
router.put("/",EditValidation.profile(), ProfileController.put);
router.post("/password", EditValidation.resetPasswordValidation(), ProfileController.resetPassword)
module.exports = router;