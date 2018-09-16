import { EncryptamajigConfigs } from "./common";
import { Constants } from "./constants";
import * as CryptoJS from "crypto-js";
import * as Debug from "debug"; const debug = Debug("encryptamajig-helper");

export class Encryptamajig {
  private static defaultConfigs = (configs?: EncryptamajigConfigs): EncryptamajigConfigs => {
    configs = configs || <any> {};
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
    throw new Error("Not implemented");
    return null;
  }

  public static decrypt = (valueToDecrypt: string, key: string, configs?: EncryptamajigConfigs): string => {
    configs = Encryptamajig.defaultConfigs(configs);
    let decryptedText = null;
    debug("Using configs: ", configs);
    try {
      const saltSize = configs.saltSize;
      const keySize = configs.keySize;
      const ivSize = configs.ivSize;
      const iterations = configs.iterations;
      const wordSize = 32;
      const allBytes = Buffer.from(valueToDecrypt, "base64");
      const saltBytes = allBytes.slice(0, saltSize);
      const saltWords = CryptoJS.lib.WordArray.create(saltBytes);
      const derivedKeyBytes = <any> CryptoJS.PBKDF2(key, saltWords, {
        keySize: (keySize + ivSize) / wordSize,
        iterations
      });
      const derivedKey = <any>CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(0, keySize / 32));
      const iv = <any>CryptoJS.lib.WordArray.create(derivedKeyBytes.words.slice(keySize / 32));

      const padding = CryptoJS.pad.Pkcs7;
      const mode = CryptoJS.mode.CBC;
      const cryptoJsConfig = {
        mode,
        padding,
        iv
      };
      const cipherTextBytes = allBytes.slice(saltSize);
      decryptedText = CryptoJS.AES.decrypt(cipherTextBytes.toString("base64"),
        derivedKey, cryptoJsConfig).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error("Failed to decrypt", e);
    }
    return decryptedText;
  }
}
