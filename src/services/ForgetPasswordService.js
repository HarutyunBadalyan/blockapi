const {SendMail} = require("../utils/sendemail");
const {Tokens} = require("../utils/tokens");
const {Password} = require("../utils/compareandhashpassword");
const User = require("../db/models/user")

class ForgetPasswordService {
    static async sendVerificationMessage(inputEmail) {
        let message;
        try {
            let user = await User.findOne({raw: true, where:{email:inputEmail}})
            if(!user) {
                throw "Invalid Email";
            }
            console.log(user)
            const token = Tokens.encodeToken(user.id);
            const authUrl = new URL(`/api/v1/forgetpassword/${token}`, process.env.BASEURL);
            await SendMail.sendEmail(inputEmail, "reset Password link", "hghghg", `<h2>Hi! ${user.firstName}</h2><p>  This HTML content is being send by NodeJS along with NodeMailer.</p>
            <a href="${authUrl}" style="background-color: #4CAF50;border: none;color: white;
            padding: 10px 25px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;
            border-radius: 8px;" target="_blank">Verify</a>`);
            message={msg:"check link from message"};
        } catch(err) {
            message = {error: err};
        } finally {
            return message;
        }
    }
    static async verifyLink(token) {
        let message;
        try {
            let decodedToken = Tokens.encodeToken(token);
            message={msg:"success"};
        } catch(err) {
            message = {error: "Token expired please try again"}
        }
        finally {
            return message
        }
    }
    static async resetPassword(password,token) {
        let message;
        try {
            let decodedToken = Tokens.decodeToken(token);
           
           let hashedPassword =  await Password.hash(password);
          await User.update({password:hashedPassword},{where:{
               id:+decodedToken.data
           }})
            message={msg:"success"};
        } catch(err) {
            console.log(err)
            message = {error: "Token expired please try again"}
        }
        finally {
            return message
        }

    }
}
module.exports =ForgetPasswordService;