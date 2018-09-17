import { Encryptamajig } from "../lib";
import { expect } from "chai";

describe("Encryptamajig Test Suite", () => {


  it("Checks if a JSON object can be encrypted and decrypted", () => {
     const name = "foo@bar"
     const jsonObj = { name };
     const key = "randomKey123";
     const encryptedText = Encryptamajig.encrypt(JSON.stringify(jsonObj), key);
     expect(encryptedText).to.be.not.null;
     const decryptedText =  Encryptamajig.decrypt(encryptedText,key);
     const decryptedObj = JSON.parse(decryptedText);
     expect(decryptedObj).to.haveOwnProperty("name");
     expect(decryptedObj.name).to.equal(name);
  });
});
