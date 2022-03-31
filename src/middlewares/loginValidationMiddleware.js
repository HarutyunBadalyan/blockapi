const  compose = require('koa-compose');
const { validationResults,body }  = require("koa-req-validation");
const validationArray = [
    body("email").isEmail().withMessage("Password must have 8 character").build(),
    body("password").isLength({min:8}).withMessage("Password must have 8 character").build(),
   
];

let loginValidationMiddleware = compose(validationArray);
module.exports = loginValidationMiddleware;