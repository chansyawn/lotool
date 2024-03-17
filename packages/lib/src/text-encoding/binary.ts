const splitStringIntoChunks = (str: string, chunkSize: number): string[] =>
  Array.from({ length: Math.ceil(str.length / chunkSize) }, (_, index) =>
    str.slice(index * chunkSize, (index + 1) * chunkSize),
  );

export const binaryToString = (binary: ArrayBuffer, radix: number): string => {
  const itemMaxLength = Math.ceil(8 / Math.log2(radix));
  return Array.from(new Uint8Array(binary))
    .map((byte: number) => byte.toString(radix).padStart(itemMaxLength, "0"))
    .join("");
};

export const stringToBinary = (str: string, radix: number): ArrayBuffer => {
  const itemMaxLength = Math.ceil(8 / Math.log2(radix));
  return new Uint8Array(
    splitStringIntoChunks(str, itemMaxLength).map((item) => parseInt(item, radix)),
  ).buffer;
};
