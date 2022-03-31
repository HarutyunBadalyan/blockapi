const Router = require('koa-router');
const authRouter = require("./AuthRouter")
const postRouter = require("./PostRouter")
const router = new Router();

router.use(authRouter.routes());
router.use(postRouter.routes())

module.exports = router;