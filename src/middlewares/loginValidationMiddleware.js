const compose = require('koa-compose');
const {body, validationResults} = require("koa-req-validation");
const validationArray = [
    body("email").isEmail().withMessage("Invalid Email").build(),
    body("password").isLength({min: 8}).withMessage("Password must have 8 character").build(),
    (ctx, next) => {
        const result = validationResults(ctx);
        if (!result.results.length) {
            return next();
        }
        ctx.body = result.results;
    }
];

let loginValidationMiddleware = compose(validationArray);
module.exports = loginValidationMiddleware;