const  compose = require('koa-compose');
const { validationResults,body }  = require("koa-req-validation");
const validationArray = [
    body("firstName").isLength({min:1}).withMessage("What's your name").build(),
    body("lastName").isLength({min:1}).withMessage("What's your lastname").build(),
    body("email").isEmail().withMessage("Invalid Email").build(),
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
    }
];

let registerValidationMiddleware = compose(validationArray);
module.exports = registerValidationMiddleware;