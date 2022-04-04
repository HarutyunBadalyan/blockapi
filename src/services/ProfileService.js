const {Tokens}  = require("../utils/tokens");
const {Password} = require("../utils/compareandhashpassword");
const {SendMail} = require("../utils/sendemail");
const User = require("../db/models/user");

console.log("this will be removed")

class ProfileService {
    static async get(token) {
        let message = {};
        try {
        let decodedToken = Tokens.decodeAccessToken(token);
        let {email, firstName, lastName, nick_name} = await User.findOne({raw:true, where:{
            id:decodedToken.data
        }})   
        message = {email, firstName, lastName, nick_name};
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

}

module.exports = ProfileService;