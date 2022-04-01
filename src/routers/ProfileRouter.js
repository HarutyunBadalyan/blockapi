const Router = require("koa-router");
const router = new Router();
const ProfileController = require("../controller/ProfileController")
const EditValidation = require("../middlewares/editValidation")
router.prefix("/api/v1/");

router.get("/profile", ProfileController.get);
router.put("/profile",EditValidation.profile(), ProfileController.put);
module.exports = router;