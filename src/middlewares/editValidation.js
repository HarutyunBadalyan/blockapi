const compose = require('koa-compose');
const {body, validationResults} = require("koa-req-validation");
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
class EditValidation {
    static profile() {
        const validationArray = [
        body("firstName").isLength({min:1}).withMessage("What's your name").build(),
        body("lastName").isLength({min:1}).withMessage("What's your lastname").build(),
        (ctx, next) => {
            const result = validationResults(ctx);
            console.log("validation",result)
            if(!result.results.length) {
                return next();
            }
            ctx.body = result.results;
        }
    ];

    return compose(validationArray);
    }
    static resetPasswordValidation() {
        const validationArray = [
        body("password").isLength({min:8}).withMessage("Password must have 8 character").build(),
        body('confirmPassword').custom((input,ctx) => {
    
            if (input !== ctx.request.body.password) {
              throw new Error('Password confirmation does not match password');
            }
        
            // Indicates the success of this synchronous custom validator
            return true;
          }).build(),
        (ctx, next) => {
            const result = validationResults(ctx);
            if(!result.results.length) {
                return next();
            }
            ctx.body = result.results;
        }];
        return compose(validationArray);
    }
    static profilePictureValidation() {
        const validationArray = [
           koaBody,
            (ctx, next) => {
                if(ctx.request.files.avatar.size > 6000000) {
                    ctx.body = {error:"file max size"}
                    return;
                }
                if(!ctx.request.files.avatar.type.includes('image')) {
                    ctx.body = {error:"invalid image type"};
                    return;
                } 
                  return  next()
                
                
            }];
        return compose(validationArray);
    }
    static postPictureValidation() {
        const validationArray = [
           koaBody,
            (ctx, next) => {
                console.log("post picture")
                if(!ctx.request.files.avatar) {
                    return next();
                }
                if(ctx.request.files.avatar.size > 6000000) {
                    ctx.body = {error:"file max size"}
                    return;
                }
                if(!ctx.request.files.avatar.type.includes('image')) {
                    ctx.body = {error:"invalid image type"};
                    return;
                } 
                  return  next()
                
                
            }];
        return compose(validationArray);
    }
    static sendVerificationValidation(){
        const validationArray = [
            body("email").isEmail().withMessage("Invalid Email").build(),
            (ctx, next) => {
                const result = validationResults(ctx);
                if(!result.results.length) {
                    return next();
                }
                ctx.body = result.results;
            }];
            return compose(validationArray);
    }
}
module.exports = EditValidation;