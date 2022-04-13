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

        const [value, metadata] = await FavPost.sequelize.query(`WITH "commentsUsers" AS (
            SELECT json_agg(json_build_object('commentsId', c.id, 'userId', c.user_id, 'userName', u."firstName", 'text',
                                              c.text, 'time', c."createdAt")) ,
                   c.post_id
            FROM "comments" c
                     LEFT JOIN "Users" U ON U.id = c.user_id
            GROUP BY post_id
        )
        SELECT pt.id as "postId",
               p.user_id,
               pt.title,
               pt.subtitle,
               pt.description,
               pt.image_url,
               pt."createdAt",
               U."firstName",
               cU.*
        FROM "favorite_posts" P
                 LEFT JOIN "Users" U on U.id = P.user_id
                 left join "Posts" pt on pt."id" = p.post_id 
                 LEFT JOIN "commentsUsers" cU on pt.id = cU.post_id
        where p.user_id = ${user_id}
        order by "createdAt" desc
        limit ${limit} offset ${offset} `)
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