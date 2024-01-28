export enum Hash {
  SHA_1 = "SHA-1",
  SHA_256 = "SHA-256",
  SHA_384 = "SHA-384",
  SHA_512 = "SHA-512",
}

export const HASH_LIST: Record<Hash, (binary: Uint8Array) => Promise<Uint8Array>> = {
  [Hash.SHA_1]: async (data) => new Uint8Array(await crypto.subtle.digest("SHA-1", data)),
  [Hash.SHA_256]: async (data) => new Uint8Array(await crypto.subtle.digest("SHA-256", data)),
  [Hash.SHA_384]: async (data) => new Uint8Array(await crypto.subtle.digest("SHA-384", data)),
  [Hash.SHA_512]: async (data) => new Uint8Array(await crypto.subtle.digest("SHA-512", data)),
};
