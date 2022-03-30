const  compose = require('koa-compose');
const { validationResults,body }  = require("koa-req-validation");
const validationArray = [
    body("email").isEmail().build(),
    body("password").isLength({min:8}).build(),
   
];

let loginValidationMiddleware = compose(validationArray);
module.exports = loginValidationMiddleware;