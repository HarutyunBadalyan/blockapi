const Router = require('koa-router');
const authRouter = require("./AuthRouter")
const postRouter = require("./PostRouter")
const profileRouter = require("./ProfileRouter");
const commentRouter = require("./CommentRouter");
const favPostRouter = require("./FavoritePostRouter")
const authorRouter = require("./AuthorRoute");
const searchRouter = require("./SearchRouter");
const forgetPasswodRouter = require("./ForgetePasswordRouter");
const Auth = require("../middlewares/auth");
const router = new Router();

router.use(authRouter.routes());
router.use(forgetPasswodRouter.routes())
router.use(postRouter.routes());
router.use(searchRouter.routes())
router.use(Auth);
router.use(profileRouter.routes());
router.use(commentRouter.routes());
router.use(favPostRouter.routes());
router.use(authorRouter.routes());

module.exports = router;