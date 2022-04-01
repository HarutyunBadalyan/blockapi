const ProfileService = require("../services/ProfileService");

class ProfileController {
    static async get(ctx) {
        ctx.body = await ProfileService.get(ctx.header["x-access-token"]);
    }
    static async put(ctx) {
        let {firstName, lastName, nick_name} = ctx.request.body
        ctx.body = await ProfileService.put(ctx.header["x-access-token"],firstName,lastName,nick_name);
    }
}

module.exports = ProfileController;