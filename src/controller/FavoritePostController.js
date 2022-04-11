const FavoritePostService = require("../services/FavoritePostService")
class FavoritePostController {

    static async addFavPost(ctx) {
        const user_id = ctx.state.user_id
        const post_id = +ctx.query.post_id;
        ctx.body = await FavoritePostService.addFavPost(user_id, post_id)
    };

    static async getFavPost(ctx) {
        const user_id = ctx.state.user.id
        const limit = ctx.query.limit || 10;
        const {offset} = ctx.query || 0;
        console.log(user_id)
        ctx.body = await FavoritePostService.getFavPost(user_id, limit, offset)
    };

    static  async deleteFavPost(ctx) {
        const user_id = ctx.state.user_id
        const post_id = ctx.query.post_id;
        ctx.body = await FavoritePostService.deleteFavPost(user_id, post_id)
    }
}

module.exports = FavoritePostController