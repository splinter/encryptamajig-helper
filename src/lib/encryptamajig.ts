import { EncryptamajigConfigs } from "./common";
import { Constants } from "./constants";
import * as CryptoJS from "crypto-js";
import * as Debug from "debug"; const debug = Debug("encryptamajig-helper");

export class Encryptamajig {
  private static defaultConfigs = (configs?: EncryptamajigConfigs): EncryptamajigConfigs => {
    configs = configs || <any>{};
    return {
      iterations: configs.iterations || 1000,
      saltSize: configs.saltSize || Constants.saltSize,
      keySize: configs.keySize || Constants.keySize,
      ivSize: configs.ivSize || Constants.ivSize,
      mode: configs.mode || CryptoJS.mode.CBC,
      padding: configs.padding || CryptoJS.pad.Pkcs7
    };
  }
  public static encrypt = (valueToEncrypt: string, key: string, configs?: EncryptamajigConfigs): string => {
    configs = Encryptamajig.defaultConfigs(configs);
    const padding = configs.padding
    const mode = configs.mode;
    const saltSize = configs.saltSize;
    const keySize = configs.keySize;
    const ivSize = configs.ivSize;
    const salt = CryptoJS.lib.WordArray.random(saltSize);
    let finalEncryptedText = null;
    debug("Started encryption");
    try {
      const derivedKeyBytes = <any>CryptoJS.PBKDF2(key, salt, {
        keySize: (keySize + ivSize) / 32,
        iterations: 1000
      });
      derivedKeyBytes.clamp();
      const derivedKey = <any>CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(0, keySize / 32));
      const iv = <any>CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(keySize / 32));
      const cryptoJsConfig = {
        mode,
        padding,
        iv
      };
      debug("Finished generating derivedKey and IV");
      const encryptedText = CryptoJS.AES.encrypt(valueToEncrypt,
        derivedKey, cryptoJsConfig);
      debug("Finished encrypting the value");
      const arr = [Buffer.from(CryptoJS.enc.Base64.stringify(salt), "base64")
        , Buffer.from(encryptedText.toString(), "base64")];
      const combinedBuffer = Buffer.concat(arr);
      finalEncryptedText = combinedBuffer.toString("base64");
      debug("Finished generating the encrypted value with salt");
    } catch (e) {
      console.error("Failed to encrypt value", e);
    }
    return finalEncryptedText;
  }

  public static decrypt = (valueToDecrypt: string, key: string, configs?: EncryptamajigConfigs): string => {
    configs = Encryptamajig.defaultConfigs(configs);
    let decryptedText = null;
    debug("Started decryption");
    try {
      const saltSize = configs.saltSize;
      const keySize = configs.keySize;
      const ivSize = configs.ivSize;
      const iterations = configs.iterations;
      const wordSize = 32;
      const allBytes = Buffer.from(valueToDecrypt, "base64");
      const saltBytes = allBytes.slice(0, saltSize);
      const saltWords = CryptoJS.lib.WordArray.create(saltBytes);
      debug("Finished extracting salt");
      const derivedKeyBytes = <any>CryptoJS.PBKDF2(key, saltWords, {
        keySize: (keySize + ivSize) / wordSize,
        iterations
      });
      const derivedKey = <any>CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(0, keySize / 32));
      const iv = <any>CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(keySize / 32));
      debug("Finished generating derivedKey and IV");
      const padding = CryptoJS.pad.Pkcs7;
      const mode = CryptoJS.mode.CBC;
      const cryptoJsConfig = {
        mode,
        padding,
        iv
      };
      const cipherTextBytes = allBytes.slice(saltSize);
      debug("Finished extracting non salt text");
      decryptedText = CryptoJS.AES.decrypt(cipherTextBytes.toString("base64"),
        derivedKey, cryptoJsConfig).toString(CryptoJS.enc.Utf8);
      debug("Finished decrypting text");
    } catch (e) {
      console.error("Failed to decrypt", e);
    }
    return decryptedText;
  }
}
