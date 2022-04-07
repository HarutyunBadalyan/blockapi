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

        const [value, metadata] = await Post.sequelize.query(`SELECT "Posts".id,
                   title,
                   subtitle,
                   description,
                   image_url,
                   nick_name,
                   "createdAt",
                   c.text,
                   c.parent_id,
                   c.post_id,
                   c.comment_author
            FROM "Posts"
                     JOIN (select nick_name, id from "Users") as u ON u.id = "Posts".user_id
                     JOIN (select nick_name as comment_author, text, post_id, parent_id, user_id
                           from comments
                                    right join "Users" u on comments.user_id = u.id) as c on "Posts".user_id = c.user_id 
             order by "createdAt" desc  limit ${limit} offset ${offset}`)
        return value
    }

    static async getAllMyPost(id, limit, offset) {

        const [value,metadata] = await Post.sequelize.query(`SELECT "Posts".id,
                   title,
                   subtitle,
                   description,
                   image_url,
                   "Posts".user_id,
                   nick_name,
                   "createdAt",
                   c.text,
                   c.parent_id,
                   c.post_id,
                   c.comment_author
            FROM "Posts"
                     JOIN (select nick_name, id from "Users") as u ON u.id = "Posts".user_id
                     JOIN (select nick_name as comment_author, text, post_id, parent_id, user_id
                           from comments
                                    right join "Users" u on comments.user_id = u.id) as c on "Posts".user_id = c.user_id 
             where "Posts".user_id = ${id} order by "createdAt" desc  limit ${limit} offset ${offset} `)
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