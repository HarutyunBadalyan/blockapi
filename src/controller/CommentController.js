const CommentService = require("../services/CommentService")

class CommentController {

    static async createComment(ctx) {

        const user_id = ctx.state.user.id;
        const post_id = ctx.query.post_id;
        const {text} = ctx.request.body;
        const parent_id = ctx.query.parent_id || 0;

        ctx.body = await CommentService.createComment(user_id, post_id, parent_id, text)
    };

    static async getComment(ctx) {

        const post_id = ctx.query.post_id;
        const parent_id = ctx.query.parent_id || 0;
        ctx.body = await CommentService.getComment(post_id,parent_id)
    };

    static async updateComment(ctx) {

        const id = ctx.query.id;
        const user_id = ctx.state.user.id;
        const text = ctx.request.body.text

        ctx.body = await CommentService.updateComment(id, user_id, text)
    };

    static async deleteComment(ctx) {

        const id = ctx.query.id;
        ctx.body = await CommentService.deleteComment(id)
    }
}

module.exports = CommentController