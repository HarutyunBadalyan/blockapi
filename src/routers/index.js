const Router = require('koa-router');
const authRouter = require("./AuthRouter")
const postRouter = require("./PostRouter")
const profileRouter = require("./ProfileRouter");
const commentRouter = require("./CommentRouter");
const favPostRouter = require("./FavoritePostRouter")
const Auth = require("../middlewares/auth");
const router = new Router();

router.use(authRouter.routes());
router.use(Auth);
router.use(postRouter.routes());
router.use(profileRouter.routes());
router.use(commentRouter.routes());
router.use(favPostRouter.routes())



module.exports = router;