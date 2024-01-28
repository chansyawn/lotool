import md5 from "./md5";

export enum Hash {
  MD5 = "MD5",
  SHA_1 = "SHA-1",
  SHA_256 = "SHA-256",
  SHA_384 = "SHA-384",
  SHA_512 = "SHA-512",
}

export const HASH_LIST: Record<Hash, (binary: ArrayBuffer) => Promise<ArrayBuffer>> = {
  [Hash.MD5]: async (data) => md5(data),
  [Hash.SHA_1]: async (data) => await crypto.subtle.digest("SHA-1", data),
  [Hash.SHA_256]: async (data) => await crypto.subtle.digest("SHA-256", data),
  [Hash.SHA_384]: async (data) => await crypto.subtle.digest("SHA-384", data),
  [Hash.SHA_512]: async (data) => await crypto.subtle.digest("SHA-512", data),
};
