const Post = require("../db/models/post");

class PostService {
    static async createPost(user_id, title, subtitle, description) {

        return await Post.create({
            title: title,
            subtitle: subtitle,
            description: description,
            user_id: user_id
        })
    };

    static async getAllPost(limit, offset) {
        return await Post.findAll({
            limit: limit,
            offset: offset,
            order: [['updatedAt', 'DESC']],
        })
    }

    static async getAllMyPost(id, limit, offset) {
        return await Post.findAll({
            where: {user_id: id},
            limit: limit,
            offset: offset,
            order: [['updatedAt', 'DESC']]
        })
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