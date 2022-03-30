const AuthService = require("../services/AuthService")
class AuthController {

    static async register (ctx) {
        const {firstName,lastName,email,password,nick_name} = ctx.request.body;
        ctx.body = await AuthService.register(firstName,lastName,email,password,nick_name)
    }
}

module.exports = AuthController