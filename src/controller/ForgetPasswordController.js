const { password } = require("../db/config/db_config");
const ForgetPasswordService = require("../services/ForgetPasswordService");
const {Tokens} = require("../utils/tokens")

class ForgetPasswordController {
 static async sendVerificationMessage(ctx) {
     ctx.body = await ForgetPasswordService.sendVerificationMessage(ctx.request.body.email)
 }
 static async verifyLink(ctx) {
     console.log( ctx.params.id)
     Tokens.decodeToken(ctx.params.id)
     ctx.body = await ForgetPasswordService.verifyLink(ctx.params.id);
 }
 static async resetPassword(ctx) {
    const {password} = ctx.request.body; 
    ctx.body = await ForgetPasswordService.resetPassword(password,ctx.params.id)
 }
}
module.exports = ForgetPasswordController;