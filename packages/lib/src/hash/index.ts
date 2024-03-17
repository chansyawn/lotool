import { md5 } from "./md5";

export enum Hash {
  MD5 = "MD5",
  SHA1 = "SHA-1",
  SHA256 = "SHA-256",
  SHA384 = "SHA-384",
  SHA512 = "SHA-512",
}

export const HASH_LIST: Record<Hash, (binary: ArrayBuffer) => Promise<ArrayBuffer>> = {
  [Hash.MD5]: async (data) =>
    new Promise((resolve) => {
      resolve(md5(data));
    }),
  [Hash.SHA1]: async (data) => await crypto.subtle.digest("SHA-1", data),
  [Hash.SHA256]: async (data) => await crypto.subtle.digest("SHA-256", data),
  [Hash.SHA384]: async (data) => await crypto.subtle.digest("SHA-384", data),
  [Hash.SHA512]: async (data) => await crypto.subtle.digest("SHA-512", data),
};
