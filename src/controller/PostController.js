const PostService = require("../services/PostService")

class PostController {

    static async createPost(ctx) {

        const {title, subtitle, description} = ctx.request.body;
        // const user_id = ctx.state.user.id;
        const user_id = 11;
        ctx.body = await PostService.createPost(user_id, title, subtitle, description)
    };

    static async getAllPosts(ctx) {

        const {limit} = ctx.query || 10;
        const {offset} = ctx.query || 0;
        ctx.body = await PostService.getAllPost(limit, offset);
    };

    static async getAllMyPosts(ctx) {

        const id = ctx.query.id;
        // const id = ctx.state.user.id;
        const limit = ctx.query.limit || 10;
        const {offset} = ctx.query || 0;
        ctx.body = await PostService.getAllMyPost(id, limit, offset)
    };

    static async updatePost(ctx) {

        // const id = ctx.state.user.id;
        const id = +ctx.query.id;
        const post_id = ctx.query.post_id;
        const body = ctx.request.body;
        ctx.body = await PostService.updatePost(id, post_id, body)
    };

    static async deletePost(ctx) {
        // const id = ctx.state.user.id;
        const id = +ctx.query.id;
        const post_id = ctx.query.post_id;
        ctx.body = await PostService.deletePost(id, post_id)
    }
}

module.exports = PostController