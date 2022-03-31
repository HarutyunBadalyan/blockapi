const  compose = require('koa-compose');
const { validationResults,body }  = require("koa-req-validation");
const validationArray = [
    body("email").withMessage("Invalid Email").isEmail().build(),
    body("password").withMessage("Password must have 8 character").isLength({min:8}).build(),
   
];

let loginValidationMiddleware = compose(validationArray);
module.exports = loginValidationMiddleware;