export async function dataEncoder(data:string):Promise<ArrayBuffer> {
    try {
        let encoder = new TextEncoder();
        return encoder.encode(data)
    } catch (err) {
        console.error("Encoder Error")
        throw err
    }
}
export async function dataDecoder(data:ArrayBuffer):Promise<string> {
    try {
        let decoder = new TextDecoder()
        return decoder.decode(data)

    } catch (err) {
        console.error("Decoder Error")
        throw err
    }
}
export async function encryptData(dataBuffer:ArrayBuffer, key:CryptoKey):Promise<ArrayBuffer> {
    try {
        const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv: Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) }, key, dataBuffer);
        return encryptedData
    }
    catch (err) {
        console.error("Error encrypting value")
        throw err;
    }
}
export async function decryptData(encryptedData:ArrayBuffer, decryptKey:CryptoKey):Promise<ArrayBuffer> {
    try {
        const decryptedData = await crypto.subtle.decrypt({ name: "AES-GCM", iv: Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) }, decryptKey, encryptedData);
        return decryptedData;
    }
    catch (err) {
        console.error("Error decrypting value")
        throw err;
    }
}
export async function genKey() {
    try {
        let key = await crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256,
            },
            true,
            ["encrypt", "decrypt"]
        );
        return key
    } catch (err) {
        throw err
    }
}
export async function impKey(objectKey:string):Promise<CryptoKey> {
    try {
        const key = await crypto.subtle.importKey(
            "jwk",
            {
                alg: "A256GCM",
                ext: true,
                k: objectKey,
                key_ops: ["encrypt", "decrypt"],
                kty: "oct"
            },
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
        return key;
    } catch (err) {
        throw err
    }
}
export async function expKey(key:CryptoKey):Promise<string> {
    try {
        const objectKey = await crypto.subtle.exportKey("jwk", key).then(jwk => jwk.k) ?? '';
        return objectKey;
    } catch (err) {
        throw err
    }
}
export async function arrayBufferToBase64(buffer:ArrayBuffer):Promise<string> {
    try {
        let binary = ''
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);

    } catch (err) {
        console.error("Array Buffer to Base64 Error")
        throw err
    }
}
export async function base64ToArrayBuffer(base64:string):Promise<ArrayBuffer> {
    try {
        let binaryString = atob(base64);
        let bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;

    } catch (err) {
        console.error("Base64 to ArrayBuffer Error")
        throw err
    }
}
