const AES = require("crypto-js/aes");
const configManager = require("./ConfigurationManager")

const secret = configManager.secret();

function encrypt(input){
    return AES.encrypt(input,secret);
}

function decrypt(cipher){
    return AES.decrypt(cipher,secret);
}

module.exports={
    encrypt:encrypt,
    decrypt:decrypt
}