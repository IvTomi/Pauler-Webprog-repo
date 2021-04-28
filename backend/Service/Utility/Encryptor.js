const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const configManager = require("./ConfigurationManager")

const secret = CryptoJS.enc.Utf8.parse(configManager.secret());

let iv = "1234567890123456";
iv = CryptoJS.enc.Utf8.parse(iv);

function encrypt(input){
    return AES.encrypt(input,secret,{iv:iv}).toString();
}

function decrypt(cipher){
    return AES.decrypt(cipher,secret,{iv:iv}).toString(CryptoJS.enc.Utf8);
}

module.exports={
    encrypt:encrypt,
    decrypt:decrypt
}