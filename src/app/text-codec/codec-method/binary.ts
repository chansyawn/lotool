const splitStringIntoChunks = (str: string, chunkSize: number): string[] =>
  Array.from({ length: Math.ceil(str.length / chunkSize) }, (_, index) =>
    str.slice(index * chunkSize, (index + 1) * chunkSize),
  );

export const binaryToString = (uint8Array: Uint8Array, radix: number): string => {
  const itemMaxLength = Math.ceil(8 / Math.log2(radix));
  return Array.from(uint8Array)
    .map((byte: number) => byte.toString(radix).padStart(itemMaxLength, "0"))
    .join("")
    .toUpperCase();
};

export const stringToBinary = (str: string, radix: number): Uint8Array => {
  const itemMaxLength = Math.ceil(8 / Math.log2(radix));
  return new Uint8Array(
    splitStringIntoChunks(str, itemMaxLength).map((item) => parseInt(item, radix)),
  );
};
