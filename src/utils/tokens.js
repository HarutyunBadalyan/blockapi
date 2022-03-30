const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY
class Tokens {
    static encodeToken(data, time)  {
        return jwt.sign({data: data}, privateKey, {expiresIn: time || 3600});
    }
    static decodeToken(token) {
        return jwt.verify(token, privateKey);
    }
    static accessTokenEncode(data, time)  {
        return jwt.sign({data: data}, privateKey, {expiresIn: time || 3600});
    }
    static decodeAccessToken(token) {
        return jwt.verify(token, privateKey);
    }
    static refreshTokenEncode(data, time)  {
        return jwt.sign({data: data}, privateKey, {expiresIn: time || 86400});
    }
    static decodeRefreshToken(token) {
        return jwt.verify(token, privateKey);
    }
}
module.exports = {Tokens};