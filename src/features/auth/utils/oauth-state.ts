import { randomBytes } from "node:crypto";

export const createOauthState = (length = 24): string =>
  randomBytes(length).toString("base64url");
