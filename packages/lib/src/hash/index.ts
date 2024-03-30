import {
  createHMAC,
  createMD5,
  createSHA1,
  createSHA256,
  createSHA384,
  createSHA512,
} from "hash-wasm";
import { type IHasher } from "hash-wasm/dist/lib/WASMInterface";

export enum Hash {
  MD5 = "MD5",
  SHA1 = "SHA-1",
  SHA256 = "SHA-256",
  SHA384 = "SHA-384",
  SHA512 = "SHA-512",
}

export type HashCreator = (hmac?: Uint8Array) => Promise<IHasher>;

const withHMAC = (hasher: () => Promise<IHasher>) => (hmac?: Uint8Array) => {
  return hmac ? createHMAC(hasher(), hmac) : hasher();
};

export const HASH_MAP: Record<Hash, HashCreator> = {
  [Hash.MD5]: withHMAC(createMD5),
  [Hash.SHA1]: withHMAC(createSHA1),
  [Hash.SHA256]: withHMAC(createSHA256),
  [Hash.SHA384]: withHMAC(createSHA384),
  [Hash.SHA512]: withHMAC(createSHA512),
};
