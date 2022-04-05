const Comment = require("../db/models/comment");
const sequelize = require('../connections/db_connection')

class CommentService {

    static async createComment(user_id, post_id, parent_id, text) {
        console.log(user_id, post_id, parent_id, text)
        return await Comment.create({
            user_id: user_id,
            post_id: post_id,
            parent_id: parent_id,
            text: text
        })
    };

    static async getComment(post_id, parent_id) {

        const [value, metadata] = await Comment.sequelize.query(`WITH RECURSIVE comments_cte (id,path,text,post_id,user_id
            ) AS (
            SELECT id,'0',text,post_id,user_id
            FROM Comments
            WHERE parent_id = ${parent_id}
            UNION ALL
            SELECT r.id,concat(path, '/', r.parent_id),r.text,r.post_id,r.user_id
            FROM Comments r
                JOIN comments_cte ON comments_cte.id = r.parent_id
                )
            SELECT id, path, text, post_id, user_id
            FROM comments_cte where post_id=${post_id}`);
        return value
    };

    static async updateComment(id, user_id, text) {
        try {
            return await Comment.update({text}, {
                where: {
                    id: id,
                    user_id: user_id
                }
            })
        } catch (e) {

        }
    };

    static async deleteComment(id, user_id) {

        await Comment.destroy({
            where: {
                id: id,
                user_id: user_id
            }
        });
        return {
            msg: " Deleted !"
        }
    }

}

module.exports = CommentService