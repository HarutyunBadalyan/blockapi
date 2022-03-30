const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY
class Tokens {
    static encodeToken(data, time)  {
        const token = jwt.sign({ data:data }, privateKey, {  expiresIn: time || 3600});
        return token;
    }
    static decodeToken(token) {
        const decoded = jwt.verify(token, privateKey);
        return decoded;
    }
    static accessTokenEncode(data, time)  {
        const token = jwt.sign({ data:data }, privateKey, {  expiresIn: time || 3600});
        return token;
    }
    static decodeAccessToken(token) {
        const decoded = jwt.verify(token, privateKey);
        return decoded;
    }
    static refreshTokenEncode(data, time)  {
        const token = jwt.sign({ data:data }, privateKey, {  expiresIn: time || 86400});
        return token;
    }
    static decodeRefreshToken(token) {
        const decoded = jwt.verify(token, privateKey);
        return decoded;
    }
}
module.exports = {Tokens};