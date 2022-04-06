const FavPost = require("../db/models/favorite_post")


class FavoritePostService {

    static async addFavPost(user_id, post_id) {

        const post = await FavPost.findOne({
            where: {
                user_id: user_id,
                post_id: post_id
            }
        });
        if (post === null) {
            await FavPost.create({
                user_id: user_id,
                post_id: post_id
            });
            return {
                msg: "Post has been added to favorite list"
            }
        } else {
            return {
                msg: "Already exists"
            }
        }
    };

    static async getFavPost(user_id, limit, offset) {

        const [value, metadata] = await FavPost.sequelize.query(`SELECT "favorite_posts"."user_id",
                    "favorite_posts"."post_id",
                    "Posts"."title",
                    "Posts"."subtitle",
                    "Posts"."description",
                    "comments"."text"      AS "Comment_text",
                    "comments"."parent_id" AS "Comment_parent_id",
                    "Posts"."createdAt"
                        FROM "favorite_posts"
                                 LEFT JOIN "Posts" ON "favorite_posts"."post_id" = "Posts"."id"
                                 left JOIN "comments" ON "favorite_posts"."post_id" = "comments"."post_id"
                        WHERE "favorite_posts"."user_id" = ${user_id} LIMIT ${limit} OFFSET ${offset}`)
        return value
    };

    static async deleteFavPost(user_id, post_id) {
        return (await FavPost.destroy({
                where: {
                    user_id: user_id,
                    post_id: post_id
                }
            }),
                {
                    msg: "Deleted !"
                }
        )
    }
}

module.exports = FavoritePostService