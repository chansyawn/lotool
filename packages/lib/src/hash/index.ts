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

const withHMAC = (hasher: () => Promise<IHasher>) => (hmac?: Uint8Array) => {
  return hmac ? hash.createHMAC(hasher(), hmac) : hasher();
};

export const HASH_MAP: Record<Hash, HashCreator> = {
  [Hash.ADLER32]: withHMAC(hash.createAdler32),
  [Hash.BLAKE2B]: withHMAC(hash.createBLAKE2b),
  [Hash.BLAKE2S]: withHMAC(hash.createBLAKE2s),
  [Hash.BLAKE3]: withHMAC(hash.createBLAKE3),
  [Hash.CRC32]: withHMAC(hash.createCRC32),
  [Hash.CRC32C]: withHMAC(hash.createCRC32C),
  [Hash.MD4]: withHMAC(hash.createMD4),
  [Hash.MD5]: withHMAC(hash.createMD5),
  [Hash.SHA1]: withHMAC(hash.createSHA1),
  [Hash.SHA224]: withHMAC(hash.createSHA224),
  [Hash.SHA256]: withHMAC(hash.createSHA256),
  [Hash.SHA384]: withHMAC(hash.createSHA384),
  [Hash.SHA512]: withHMAC(hash.createSHA512),
  [Hash.SM3]: withHMAC(hash.createSM3),
  [Hash.WHIRLPOOL]: withHMAC(hash.createWhirlpool),
  [Hash.XXHASH32]: withHMAC(hash.createXXHash32),
  [Hash.XXHASH64]: withHMAC(hash.createXXHash64),
  [Hash.XXHASH3]: withHMAC(hash.createXXHash3),
  [Hash.XXHASH128]: withHMAC(hash.createXXHash128),
};
