const Post = require("../db/models/post");
const Comment = require("../db/models/comment")
const fs = require("fs/promises")
const PictureFile = require("../utils/fileuploadanddelete");

class PostService {
    static async createPost(user_id, title, subtitle, description,avatar) {
        let response 
        if(avatar) {
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
            image_url:response?.url,
            public_id:response?.public_id
        })
    };

    static async getAllPost(limit, offset) {
        return await Post.findAll({
            limit: limit,
            offset: offset,
            include: [{
                model:Comment,
                nested: true,
                limit:5
            }],
            order: [['createdAt', 'DESC']]
        })
    }

    static async getAllMyPost(id, limit, offset) {
        return await Post.findAll({
            where: {user_id: id},
            limit: limit,
            offset: offset,
            include: [{
                model:Comment,
                nested: true,
                limit:5
            }],
            order: [['createdAt', 'DESC']]
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
            if(post.dataValues.public_id){
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