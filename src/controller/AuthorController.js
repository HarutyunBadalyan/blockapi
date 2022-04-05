const PostService = require("../services/PostService")
const CommentService = require("../services/CommentService")
class AuthorController {
    static async getAuthorPosts(ctx) {
        console.log(ctx.params)
        let offset = ctx.query.offset || 0;
        let limit = ctx.query.limit || 10;
        ctx.body = await PostService.getAllMyPost(ctx.query.id,limit,offset)
    }
    static async writeComment(ctx) {
        let { post_id, parent_id, text} = ctx.request.body;
        ctx.body = await CommentService.createComment(ctx.state.user.id,post_id,parent_id || 0,text)
    }
}

module.exports = AuthorController;