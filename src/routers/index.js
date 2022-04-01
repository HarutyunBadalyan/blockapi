const Router = require('koa-router');
const authRouter = require("./AuthRouter")
const postRouter = require("./PostRouter")
const profileRouter = require("./ProfileRouter");
const router = new Router();

router.use(authRouter.routes());
router.use(postRouter.routes());
router.use(profileRouter.routes());

module.exports = router;