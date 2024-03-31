import * as hash from "hash-wasm";
import { type IHasher } from "hash-wasm/dist/lib/WASMInterface";

export enum Hash {
  ADLER32 = "Adler32",
  BLAKE2B = "BLAKE2b",
  BLAKE2S = "BLAKE2s",
  BLAKE3 = "BLAKE3",
  CRC32 = "CRC32",
  CRC32C = "CRC32C",
  MD4 = "MD4",
  MD5 = "MD5",
  SHA1 = "SHA-1",
  SHA224 = "SHA-224",
  SHA256 = "SHA-256",
  SHA384 = "SHA-384",
  SHA512 = "SHA-512",
  SM3 = "SM3",
  WHIRLPOOL = "Whirlpool",
  XXHASH32 = "XXHash32",
  XXHASH64 = "XXHash64",
  XXHASH3 = "XXHash3",
  XXHASH128 = "XXHash128",
}

export type HashCreator = (hmac?: Uint8Array) => Promise<IHasher>;

export const withHMAC = (hasher: () => Promise<IHasher>) => (hmac?: Uint8Array) => {
  return hmac ? hash.createHMAC(hasher(), hmac) : hasher();
};

export const HASH_MAP: Record<Hash, () => Promise<IHasher>> = {
  [Hash.ADLER32]: hash.createAdler32,
  [Hash.BLAKE2B]: hash.createBLAKE2b,
  [Hash.BLAKE2S]: hash.createBLAKE2s,
  [Hash.BLAKE3]: hash.createBLAKE3,
  [Hash.CRC32]: hash.createCRC32,
  [Hash.CRC32C]: hash.createCRC32C,
  [Hash.MD4]: hash.createMD4,
  [Hash.MD5]: hash.createMD5,
  [Hash.SHA1]: hash.createSHA1,
  [Hash.SHA224]: hash.createSHA224,
  [Hash.SHA256]: hash.createSHA256,
  [Hash.SHA384]: hash.createSHA384,
  [Hash.SHA512]: hash.createSHA512,
  [Hash.SM3]: hash.createSM3,
  [Hash.WHIRLPOOL]: hash.createWhirlpool,
  [Hash.XXHASH32]: hash.createXXHash32,
  [Hash.XXHASH64]: hash.createXXHash64,
  [Hash.XXHASH3]: hash.createXXHash3,
  [Hash.XXHASH128]: hash.createXXHash128,
};
