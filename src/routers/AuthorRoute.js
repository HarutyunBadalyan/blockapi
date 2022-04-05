const Router = require("koa-router");
const AuthorController = require("../controller/AuthorController")
const router = new Router();

router.prefix("/api/v1/author");

router.get("/",AuthorController.getAuthorPosts )
router.put("/", AuthorController.writeComment)



module.exports = router;