export async function encryptData(data: string): Promise<{ encryptedData: ArrayBuffer, decryptKey: CryptoKey }> {
    try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const decryptKey = await window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"])
        const encryptedData = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: new Uint8Array(12) }, decryptKey, dataBuffer);
        return { encryptedData, decryptKey }
    }
    catch (err) {
        throw err;
    }
}
export async function decryptData(encryptedData: ArrayBuffer, decryptKey: CryptoKey): Promise<string> {
    try {
        const decryptData = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(12) }, decryptKey, encryptedData);
        const decoder = new TextDecoder();
        const decryptedString = decoder.decode(decryptData);
        return decryptedString;
    }
    catch (err) {
        throw err;
    }
}
