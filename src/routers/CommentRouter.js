const Router = require("koa-router");
const CommentController = require("../controller/CommentController");

const router = new Router();

router.prefix("/api/v1/comment")

router.post("/", CommentController.createComment);
router.get("/", CommentController.getComment);
router.put("/", CommentController.updateComment);
router.delete("/", CommentController.deleteComment)

module.exports = router