type Serializable = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

type StorageKind = "local" | "session";

import { clientStorageConfig } from "@/core/configs/app-config";

type SecureStorageOptions = {
  storage?: StorageKind;
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const getStorage = (kind: StorageKind = "local") => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return kind === "local" ? window.localStorage : window.sessionStorage;
};

const importKey = async (secret: string) => {
  const secretBuffer = textEncoder.encode(secret);
  const keyBuffer = await crypto.subtle.digest("SHA-256", secretBuffer);

  return crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
};

const generateIv = () => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  return iv;
};

const encode = (data: ArrayBuffer | Uint8Array) => {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  return btoa(String.fromCharCode(...bytes));
};

const decode = (value: string) => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const encrypt = async (payload: string, secret: string) => {
  const iv = generateIv();
  const key = await importKey(secret);
  const encodedPayload = textEncoder.encode(payload);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodedPayload,
  );

  return `${encode(iv)}.${encode(encryptedBuffer)}`;
};

const decrypt = async (payload: string, secret: string) => {
  const [encodedIv, encodedData] = payload.split(".");

  if (!encodedIv || !encodedData) {
    throw new Error("Malformed encrypted payload");
  }

  const iv = decode(encodedIv);
  const data = decode(encodedData);
  const key = await importKey(secret);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data,
  );

  return textDecoder.decode(decrypted);
};

export const createSecureStorage = (secret: string, options: SecureStorageOptions = {}) => {
  const storage = getStorage(options.storage);

  const ensureStorage = () => {
    if (!storage) {
      throw new Error("Storage is not available in the current environment");
    }

    return storage;
  };

  return {
    async setItem(key: string, value: Serializable) {
      const target = ensureStorage();
      const payload = JSON.stringify(value);
      const encrypted = await encrypt(payload, secret);
      target.setItem(key, encrypted);
    },
    async getItem<TValue = Serializable>(key: string): Promise<TValue | null> {
      const target = ensureStorage();
      const encrypted = target.getItem(key);

      if (!encrypted) {
        return null;
      }

      const payload = await decrypt(encrypted, secret);
      return JSON.parse(payload) as TValue;
    },
    removeItem(key: string) {
      const target = ensureStorage();
      target.removeItem(key);
    },
    clear() {
      const target = ensureStorage();
      target.clear();
    },
  } as const;
};

export type SecureStorage = ReturnType<typeof createSecureStorage>;

export const createAppSecureStorage = (options: SecureStorageOptions = {}) =>
  createSecureStorage(clientStorageConfig.encryptionSalt, options);
