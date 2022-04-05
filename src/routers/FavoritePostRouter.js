const Router = require("koa-router");
const FavoritePostController = require("../controller/FavoritePostController")

const router = new Router();
router.prefix("/api/v1/favpost")

router.post("/", FavoritePostController.addFavPost);
router.get("/", FavoritePostController.getFavPost);
router.delete("/", FavoritePostController.deleteFavPost);

module.exports = router