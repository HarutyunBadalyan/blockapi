const Router = require("koa-router");
const router = new Router()
const PostController = require("../controller/PostController")

router.prefix("/api/v1/post");

router.post("/", PostController.createPost);
router.get("/mypost", PostController.getAllMyPosts)
router.get("/", PostController.getAllPosts);

router.patch("/", PostController.updatePost);
router.delete("/", PostController.deletePost)

module.exports = router