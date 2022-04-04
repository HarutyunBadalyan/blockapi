const {Tokens} = require("../utils/tokens")
module.exports = async (ctx, next) => {
    try{
        const accessToken = ctx.request.header['x-access-token'];
        Tokens.decodeAccessToken(accessToken);
        await next()
    }catch (e){
        ctx.body = {
            error:"Permission denied"
        }
    }
}