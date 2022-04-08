const Post = require("../db/models/post");
const Comment = require("../db/models/comment")
const Users = require("../db/models/user")
const fs = require("fs/promises")
const PictureFile = require("../utils/fileuploadanddelete");

class PostService {

    static async createPost(user_id, title, subtitle, description, avatar) {
        let response
        if (avatar) {
            const {path, name, type} = avatar
            let fileBuffer = await fs.readFile(path);
            response = await PictureFile.upload(fileBuffer);
            console.log(response)
        } else {
            response = null
        }

        return await Post.create({
            title: title,
            subtitle: subtitle,
            description: description,
            user_id: user_id,
            image_url: response?.url,
            public_id: response?.public_id
        })
    };

    static async getAllPost(limit, offset) {

        const [value, metadata] = await Post.sequelize.query(`WITH commentsUsers AS (
                        SELECT json_agg(json_build_object('commentsId', c.id, 'userId', c.user_id, 'userName', u."firstName", 'text',
                                                          c.text, 'time', c."createdAt")) comments,
                               c.post_id
                        FROM comments c
                                 LEFT JOIN "Users" U ON U.id = c.user_id
                        GROUP BY post_id
                    )
                    SELECT p.id as "postId",
                           p.user_id,
                           p.title,
                           p.subtitle,
                           p.description,
                           p.image_url,
                           p."createdAt",
                           U."firstName",
                           cU.*
                    FROM "Posts" P
                             LEFT JOIN "Users" U on U.id = P.user_id
                             LEFT JOIN commentsUsers cU on P.id = cU.post_id
                    order by "createdAt" desc
                    limit ${limit} offset ${offset} `)
        return value
    }

    static async getAllMyPost(id, limit, offset) {

        const [value, metadata] = await Post.sequelize.query(`WITH commentsUsers AS (
                       SELECT json_agg(json_build_object('commentsId', c.id, 'userId', c.user_id, 'userName', u."firstName", 'text',
                                                         c.text, 'time', c."createdAt")) comments,
                              c.post_id
                       FROM comments c
                                LEFT JOIN "Users" U ON U.id = c.user_id
                       GROUP BY post_id
                   )
                   SELECT p.id as "postId",
                          p.user_id,
                          p.title,
                          p.subtitle,
                          p.description,
                          p.image_url,
                          p."createdAt",
                          U."firstName",
                          cU.*
                   FROM "Posts" P
                            LEFT JOIN "Users" U on U.id = P.user_id
                            LEFT JOIN commentsUsers cU on P.id = cU.post_id
                   where user_id = ${id}
                   order by "createdAt" desc
                   limit ${limit} offset ${offset} `)
        return value
    };

    static async updatePost(id, post_id, body) {

        const post = await Post.findOne({
            where: {
                id: post_id
            }
        });

        if (post.user_id === id) {

            const updatePost = await Post.update(body, {
                where: {
                    user_id: id,
                    id: post_id
                }
            });
            return ({
                msg: "Post successfully updated !",
                post: updatePost
            })
        } else {
            return ({
                error: "Not Done!Permission denied"
            })
        }
    };

    static async deletePost(id, post_id) {

        const post = await Post.findOne({
            where: {
                id: post_id
            }
        });
        if (post.user_id === id) {
            if (post.dataValues.public_id) {
                let response = await PictureFile.delete(post.dataValues.public_id)
            }
            await Post.destroy({
                where: {
                    user_id: id,
                    id: post_id
                }
            });
            return ({
                msg: "Post successfully deleted !",
            })
        } else {
            return ({
                error: "Not Done!Permission denied"
            })
        }


    }
}

module.exports = PostService