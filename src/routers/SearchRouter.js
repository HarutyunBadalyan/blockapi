const Router = require("koa-router");
const SearchController = require('../controller/SearchController')
const router = new Router();

router.prefix("/api/v1/search");

router.get("/", SearchController.globalSearch);

module.exports = router