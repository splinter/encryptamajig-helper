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
        throw new Error("Not implemented");
        return null;
    };
    Encryptamajig.decrypt = function (valueToDecrypt, key, configs) {
        configs = Encryptamajig.defaultConfigs(configs);
        var decryptedText = null;
        debug("Using configs: ", configs);
        try {
            var saltSize = configs.saltSize;
            var keySize = configs.keySize;
            var ivSize = configs.ivSize;
            var iterations = configs.iterations;
            var wordSize = 32;
            var allBytes = Buffer.from(valueToDecrypt, "base64");
            var saltBytes = allBytes.slice(0, saltSize);
            var saltWords = CryptoJS.lib.WordArray.create(saltBytes);
            var derivedKeyBytes = CryptoJS.PBKDF2(key, saltWords, {
                keySize: (keySize + ivSize) / wordSize,
                iterations: iterations
            });
            var derivedKey = CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(0, keySize / 32));
            var iv = CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(keySize / 32));
            var padding = CryptoJS.pad.Pkcs7;
            var mode = CryptoJS.mode.CBC;
            var cryptoJsConfig = {
                mode: mode,
                padding: padding,
                iv: iv
            };
            var cipherTextBytes = allBytes.slice(saltSize);
            decryptedText = CryptoJS.AES.decrypt(cipherTextBytes.toString("base64"), derivedKey, cryptoJsConfig).toString(CryptoJS.enc.Utf8);
        }
        catch (e) {
            console.error("Failed to decrypt", e);
        }
        return decryptedText;
    };
    return Encryptamajig;
}());
exports.Encryptamajig = Encryptamajig;
