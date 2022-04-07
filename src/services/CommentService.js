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

        const [value, metadata] = await Comment.sequelize.query(`WITH RECURSIVE comments_cte (comment_id,path,text,post_id,user_id
            ) AS (
            SELECT id,'0',text,post_id,user_id
            FROM Comments
            WHERE parent_id = ${parent_id}
            UNION ALL
            SELECT r.id,concat(path, '/', r.parent_id),r.text,r.post_id,r.user_id
            FROM Comments r
                JOIN comments_cte ON comments_cte.comment_id = r.parent_id
                )
            SELECT comment_id, path, text, post_id, user_id, "Users".nick_name
            FROM comments_cte
              join "Users" on "Users".id = comments_cte.user_id
             where post_id=${post_id}`)
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

    static async deleteComment(id) {

        await Comment.sequelize.query(`DELETE
            FROM Comments
            WHERE id IN (
                WITH recursive all_comments (id, parentid, root_id) AS (
                    SELECT t1.id,
                           t1.parent_id as parentid,
                           t1.id        as root_id
                    FROM Comments t1
            
                    UNION ALL
            
                    SELECT c1.id,
                           c1.parent_id AS parentid,
                           p.root_id
                    FROM Comments c1
                             JOIN all_comments p ON p.id = c1.parent_id
                )
                SELECT id
                FROM all_comments ap
                WHERE root_id = ${id}
            )`);
        return {
            msg: " Deleted !"
        }
    }

}

module.exports = CommentService