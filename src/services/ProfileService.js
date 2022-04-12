const {Tokens}  = require("../utils/tokens");
const {Password} = require("../utils/compareandhashpassword");
const {SendMail} = require("../utils/sendemail");
const User = require("../db/models/user");
const Image = require("../db/models/image")
const fs = require("fs/promises")
const PictureFile = require("../utils/fileuploadanddelete");


class ProfileService {
    static async get(token) {
        let message = {};
        try {
        let decodedToken = Tokens.decodeAccessToken(token);
        let {email, firstName, lastName, nick_name} = await User.findOne({raw:true, where:{
            id:decodedToken.data
        }})
        let image = await Image.findOne({raw:true, where:{ user_id:decodedToken.data}})   
        message = {email, firstName, lastName, nick_name,url:image?.url};
        } catch(e) {
            console.log("Profile service",e);
            message = {error: "token expired"};
        } finally {
            return message;
        }
    }
    static async put(token, firstName, lastName, nick_name) {
        let message = {};
        try {
        let decodedToken = Tokens.decodeAccessToken(token);
        let user = await User.findOne({raw:true, where:{
            id:decodedToken.data
        }})   
        if(!user) {
            throw "Invalid User";
        }
        let updatedUser = await User.update({firstName,lastName, nick_name},{where:{id:user.id}});
        console.log(updatedUser)
        if(!updatedUser[0]) {
            throw "something went wrong"
        }
        message = {msg:"success"};
        } catch(e) {
            console.log("Profile service",e);
            message = {error: "token expired"};
        } finally {
            return message;
        }
    }
    static async resetPassword(password,token) {
        let message = {};
        try {
            let decodedToken = Tokens.decodeAccessToken(token);
            let user = await User.findOne({raw:true, where:{
            id:decodedToken.data
             }})   
             if(!user) {
                throw "Invalid User";
            }
           const hashedPassword = await Password.hash(password);
           const encodedToken = Tokens.encodeToken(JSON.stringify({password:hashedPassword,id:user.id}));
           const authUrl = new URL(`/api/v1/auth/password/${encodedToken}`, process.env.BASEURL);
           await SendMail.sendEmail(user.email, "Reset Password verify", "hghghg", `<h2>Hi! ${user.firstName}</h2><p>  This HTML content is being send by NodeJS along with NodeMailer.</p>
           <a href="${authUrl}" style="background-color: #4CAF50;border: none;color: white;
           padding: 10px 25px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;
           border-radius: 8px;" target="_blank">Verify</a>`)
           message = {msg: "success"};
        } catch(e) {
            console.log("reset password",e)
            message = {error: e}
        } finally {
            return message;
        }
    }
    static async verifyPassword(token) {
        let message
        try {
            let decoded = Tokens.decodeToken(token);
            let objectDecode = JSON.parse(decoded.data)
            await User.update({  password: objectDecode.password}, {
                where: {
                   id: objectDecode.id
                }
            })
            message = {msg: "success"};

        } catch (e) {
            console.log("verifypassworderror", e);
            message = {msg: "token expired"};
        } finally {
            return message;
        }
    
    }
    static async profilePictureSave(ctx) {
        let message = {};
        try {
            let decodedToken = Tokens.decodeAccessToken(ctx.header["x-access-token"]);
            const {path, name, type} = ctx.request.files.avatar
            let fileBuffer = await fs.readFile(path);
            let response = await PictureFile.upload(fileBuffer);
            const img = await Image.findOne({where:{user_id:decodedToken.data}})
            if(img){
                await Image.destroy({where: {user_id:decodedToken.data}})
            }
            await Image.create({url:response.url, user_id: decodedToken.data, public_id: response.public_id})
           message = {msg: "success"};
        } catch(e) {
            console.log("profile picture",e)
            message = {error: e}
        } finally {
            return message;
        }

    }
    static async profilePictureDelete(ctx) {
        let message = {};
        try {
            let decodedToken = Tokens.decodeAccessToken(ctx.header["x-access-token"]);
            const image = await Image.findOne({raw:true, where:{user_id:decodedToken.data}})
            let response = await PictureFile.delete(image.public_id);
            const deletedImage = await Image.destroy({where:{id: image.id}})
            console.log(response);
           message = {msg: "success"};
        } catch(e) {
            console.log("profile picture delete",e)
            message = {error: e}
        } finally {
            return message;
        }

    }
}

module.exports = ProfileService;