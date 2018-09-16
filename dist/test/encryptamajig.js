"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var chai_1 = require("chai");
describe("Encryptamajig Test Suite", function () {
    it("Checks if it can decrypt an encrypted value.", function () {
        var encryptedText = "PHsN/D+0Cp7MOfoAlOQHOWrOeWbtKGnyAR5FQzd29p5ke6rJBbUAlf4ps1dz5s4JVzIraWdn1keetBj8GwouFZbY3u2BEepd9TiIampTMgLgBzfFIjwWof2CrCIuCXov8Ov8zKZEf8KrQjmO1b//gtRFYNEL0B7qnb70EamdIDeAz9hyZlTIuZb0Zz/ePNszL/OvXIpWopfup4dRZTir1TY9sYopHQk5AG6ihZdFQgRYuRTcPGI6Wi+9nyAEOVFrzxcdImgh8rYJB4H7u9AhvotVh3nV/mQrLYiL5UGcWvN6Qb6j1kzBWqxsOsgGUOiGcOxX4xunA9geel0szaY9KJ/9y/O40F4Id/NrewZniEg=";
        var key = "623vP8Xou2398FdaSXz6LiGBhR7hcUNUamEu0Q2jvEX7uJGeszUfciuTNySx";
        var decryptedText = lib_1.Encryptamajig.decrypt(encryptedText, key);
        chai_1.expect(decryptedText).to.be.not["null"];
        chai_1.expect(decryptedText).to.be.not.empty;
        console.log("Decrypted text: ", decryptedText);
    });
});
