const {Tokens}  = require("../utils/tokens");
const User = require("../db/models/user");



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
    static async put(token,email, firstName, lastName, nick_name) {
        let message = {};
        try {
        let decodedToken = Tokens.decodeAccessToken(token);
        let user = await User.findOne({raw:true, where:{
            id:decodedToken.data
        }})   
        if(!user) {
            throw "Invalid User";
        }
        let updatedUser = await User.update({email,firstName,lastName, nick_name},{where:{id:user.id}});
        console.log(updatedUser)
        if(!updatedUser[0]) {
            throw "something went wrong"
        }
        message = {msg:"success"};
        } catch(e) {
            console.log("Profile service",e.includes("TokenExpiredError"));
            if(e.name === "SequelizeUniqueConstraintError") {
                message = {error: "This Email already used"};
            }
            if(e.includes("TokenExpiredError")) {
            message = {error: "token expired"};
            }
            message = {error: e}
        } finally {
            return message;
        }
    }

}

module.exports = ProfileService;