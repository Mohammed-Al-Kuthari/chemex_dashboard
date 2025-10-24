import { createHash, randomBytes } from "node:crypto";

const PKCE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
const DEFAULT_VERIFIER_LENGTH = 96;

export interface PkcePair {
  verifier: string;
  challenge: string;
}

export const generateCodeVerifier = (length: number = DEFAULT_VERIFIER_LENGTH): string => {
  if (length < 43 || length > 128) {
    throw new RangeError("PKCE code verifier length must be between 43 and 128 characters.");
  }

  const random = randomBytes(length);
  let verifier = "";

  for (let i = 0; i < length; i += 1) {
    verifier += PKCE_CHARSET[random[i] % PKCE_CHARSET.length];
  }

  return verifier;
};

export const generateCodeChallenge = (verifier: string): string => {
  const hash = createHash("sha256").update(verifier).digest();
  return base64UrlEncode(hash);
};

export const createPkcePair = (length?: number): PkcePair => {
  const verifier = generateCodeVerifier(length);
  const challenge = generateCodeChallenge(verifier);

  return { verifier, challenge };
};

const base64UrlEncode = (buffer: Buffer): string =>
  buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

export const base64UrlFromString = (value: string): string =>
  Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
