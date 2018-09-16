# Introduction

This is a helper library to replicate the encryption and decryption logic in the [Encryptamajig](https://github.com/jbubriski/Encryptamajig) .Net library.

# Installation

This is a temproary step till the module is added to the NPM registry.
```bash
"encryptamajig-helper": "github:splinter/encryptamajig-helper"
```

# Usage


## Decryption

Add the following import:

```js
import { Encryptamajig } from "encryptamajig-helper"
```


```js
const encryptedText = "xxxx";
const key = "xxxx";
Encryptamajig.decrypt(encryptedText, key);
```

Optionally `decrypt` will accept a Encryptamajig Configurations object.

# Encryptamajig Configurations

Name | Description | Default Value
---|---|---
iterations   |   Number of iterations to be used in the PBKDF2 function | 1000
mode | CryptoJS mode value |  CBC
padding | CryptoJS padding value | Pkcs7
saltSize | Size of the salt used in the PBKDF2 function | 32
keySize  | Key size to be generated from PBKDF2 | 256
ivSize | The size of Initialization Vector to be generated from PBKDF2 | 128


# References

[1] Deriving IV and Key, URL: https://stackoverflow.com/questions/29807108/derive-key-and-iv-from-string-for-aes-encryption-in-cryptojs-and-php

[2] CryptoJS Wiki, URL: https://code.google.com/archive/p/crypto-js/wikis/QuickStartGuide_v3beta.wiki

[3] AES encryption in CryptoJs, URL: https://codingclub.wordpress.com/2014/08/18/aes-encryption-in-javascript-and-decryption-in-c/

[4] Does CryptoJS use PBKDF2 function by default, URL: https://crypto.stackexchange.com/questions/19739/does-googles-crypto-js-aes-encryption-use-pbkdf2-as-default

[5] Rfc2898DeriveBytes Documenation , URL: https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.rfc2898derivebytes?redirectedfrom=MSDN&view=netframework-4.7.2

[6] CryptoJS Hasher Output, URL: https://code.google.com/archive/p/crypto-js/#The_Hasher_Output

[7] WordArray to String, URL: https://stackoverflow.com/questions/11889329/word-array-to-string

[8] AesEncryptamajig Implementation, URL: https://github.com/jbubriski/Encryptamajig/blob/master/src/Encryptamajig/Encryptamajig/AesEncryptamajig.cs

[9] Encryptamajig: "simple wrapper to the .NET AES encryption algorithm functionality" , URL: https://github.com/jbubriski/Encryptamajig
