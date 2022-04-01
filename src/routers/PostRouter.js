const Router = require("koa-router");
const PostController = require("../controller/PostController");

const router = new Router()

router.prefix("/api/v1/post");

router.post("/", PostController.createPost);
router.get("/mypost", PostController.getAllMyPosts)
router.get("/", PostController.getAllPosts);

router.patch("/", PostController.updatePost);
router.delete("/", PostController.deletePost)

module.exports = router