const compose = require('koa-compose');
const {body, validationResults} = require("koa-req-validation");

class EditValidation {
    static profile() {
        const validationArray = [
        body("firstName").isLength({min:1}).withMessage("What's your name").build(),
        body("lastName").isLength({min:1}).withMessage("What's your lastname").build(),
        body("email").isEmail().withMessage("Invalid Email").build(),
        (ctx, next) => {
            const result = validationResults(ctx);
            console.log("validation",result)
            if(!result.results.length) {
                return next();
            }
            ctx.body = result.results;
        }
    ];
    
    let editValidationMiddleware = compose(validationArray);
    return editValidationMiddleware;
    }
}
module.exports = EditValidation;