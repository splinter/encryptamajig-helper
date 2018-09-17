"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
var CryptoJS = require("crypto-js");
var Debug = require("debug");
var debug = Debug("encryptamajig-helper");
var Encryptamajig = /** @class */ (function () {
    function Encryptamajig() {
    }
    Encryptamajig.defaultConfigs = function (configs) {
        configs = configs || {};
        return {
            iterations: configs.iterations || 1000,
            saltSize: configs.saltSize || constants_1.Constants.saltSize,
            keySize: configs.keySize || constants_1.Constants.keySize,
            ivSize: configs.ivSize || constants_1.Constants.ivSize,
            mode: configs.mode || CryptoJS.mode.CBC,
            padding: configs.padding || CryptoJS.pad.Pkcs7
        };
    };
    Encryptamajig.encrypt = function (valueToEncrypt, key, configs) {
        configs = Encryptamajig.defaultConfigs(configs);
        var padding = configs.padding;
        var mode = configs.mode;
        var saltSize = configs.saltSize;
        var keySize = configs.keySize;
        var ivSize = configs.ivSize;
        var salt = CryptoJS.lib.WordArray.random(saltSize);
        var finalEncryptedText = null;
        debug("Started encryption");
        try {
            var derivedKeyBytes = CryptoJS.PBKDF2(key, salt, {
                keySize: (keySize + ivSize) / 32,
                iterations: 1000
            });
            derivedKeyBytes.clamp();
            var derivedKey = CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(0, keySize / 32));
            var iv = CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(keySize / 32));
            var cryptoJsConfig = {
                mode: mode,
                padding: padding,
                iv: iv
            };
            debug("Finished generating derivedKey and IV");
            var encryptedText = CryptoJS.AES.encrypt(valueToEncrypt, derivedKey, cryptoJsConfig);
            debug("Finished encrypting the value");
            var arr = [Buffer.from(CryptoJS.enc.Base64.stringify(salt), "base64"),
                Buffer.from(encryptedText.toString(), "base64")];
            var combinedBuffer = Buffer.concat(arr);
            finalEncryptedText = combinedBuffer.toString("base64");
            debug("Finished generating the encrypted value with salt");
        }
        catch (e) {
            console.error("Failed to encrypt value", e);
        }
        return finalEncryptedText;
    };
    Encryptamajig.decrypt = function (valueToDecrypt, key, configs) {
        configs = Encryptamajig.defaultConfigs(configs);
        var decryptedText = null;
        debug("Started decryption");
        try {
            var saltSize = configs.saltSize;
            var keySize = configs.keySize;
            var ivSize = configs.ivSize;
            var iterations = configs.iterations;
            var wordSize = 32;
            var allBytes = Buffer.from(valueToDecrypt, "base64");
            var saltBytes = allBytes.slice(0, saltSize);
            var saltWords = CryptoJS.lib.WordArray.create(saltBytes);
            debug("Finished extracting salt");
            var derivedKeyBytes = CryptoJS.PBKDF2(key, saltWords, {
                keySize: (keySize + ivSize) / wordSize,
                iterations: iterations
            });
            var derivedKey = CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(0, keySize / 32));
            var iv = CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(keySize / 32));
            debug("Finished generating derivedKey and IV");
            var padding = CryptoJS.pad.Pkcs7;
            var mode = CryptoJS.mode.CBC;
            var cryptoJsConfig = {
                mode: mode,
                padding: padding,
                iv: iv
            };
            var cipherTextBytes = allBytes.slice(saltSize);
            debug("Finished extracting non salt text");
            decryptedText = CryptoJS.AES.decrypt(cipherTextBytes.toString("base64"), derivedKey, cryptoJsConfig).toString(CryptoJS.enc.Utf8);
            debug("Finished decrypting text");
        }
        catch (e) {
            console.error("Failed to decrypt", e);
        }
        return decryptedText;
    };
    return Encryptamajig;
}());
exports.Encryptamajig = Encryptamajig;
