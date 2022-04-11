const Router = require("koa-router");
const PostController = require("../controller/PostController");
const EditValidation = require("../middlewares/editValidation");
const Auth = require("../middlewares/auth")
const router = new Router()

router.prefix("/api/v1/post");
router.get("/", PostController.getAllPosts);
router.use(Auth)
router.post("/", EditValidation.postPictureValidation(), PostController.createPost);
router.get("/mypost", PostController.getAllMyPosts)

router.patch("/", PostController.updatePost);
router.delete("/", PostController.deletePost)

module.exports = router