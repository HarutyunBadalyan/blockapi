const {Tokens} = require("../utils/tokens")
module.exports = async (ctx, next) => {
    try{
        const accessToken = ctx.request.header['x-access-token'];
        const x = Tokens.decodeAccessToken(accessToken);
        ctx.state = {user:{id:x.data}};
        await next()

    }catch (e){
        console.log("permission denied", e)
        ctx.body = {
            error:"Permission denied"
        }
    }
}