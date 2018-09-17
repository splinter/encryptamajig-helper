"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var chai_1 = require("chai");
describe("Encryptamajig Test Suite", function () {
    it("Checks if a JSON object can be encrypted and decrypted", function () {
        var name = "foo@bar";
        var jsonObj = { name: name };
        var key = "randomKey123";
        var encryptedText = lib_1.Encryptamajig.encrypt(JSON.stringify(jsonObj), key);
        chai_1.expect(encryptedText).to.be.not["null"];
        var decryptedText = lib_1.Encryptamajig.decrypt(encryptedText, key);
        var decryptedObj = JSON.parse(decryptedText);
        chai_1.expect(decryptedObj).to.haveOwnProperty("name");
        chai_1.expect(decryptedObj.name).to.equal(name);
    });
});
