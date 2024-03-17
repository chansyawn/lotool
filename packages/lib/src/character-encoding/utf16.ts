/* eslint-disable @typescript-eslint/no-non-null-assertion -- trust me */
/* eslint-disable no-bitwise -- trust me */

export const utf8ToUtf16 = (utf8Data: Uint8Array, endianness: "BE" | "LE" = "BE"): ArrayBuffer => {
  const utf16Data: number[] = [];

  for (let i = 0; i < utf8Data.length; ) {
    let codePoint;

    const firstByte = utf8Data[i++]!;
    if (firstByte < 0x80) {
      codePoint = firstByte;
    } else if (firstByte < 0xe0) {
      const secondByte = utf8Data[i++]!;
      codePoint = ((firstByte & 0x1f) << 6) | (secondByte & 0x3f);
    } else if (firstByte < 0xf0) {
      const secondByte = utf8Data[i++]!;
      const thirdByte = utf8Data[i++]!;
      codePoint = ((firstByte & 0xf) << 12) | ((secondByte & 0x3f) << 6) | (thirdByte & 0x3f);
    } else {
      const secondByte = utf8Data[i++]!;
      const thirdByte = utf8Data[i++]!;
      const fourthByte = utf8Data[i++]!;
      codePoint =
        ((firstByte & 0x7) << 18) |
        ((secondByte & 0x3f) << 12) |
        ((thirdByte & 0x3f) << 6) |
        (fourthByte & 0x3f);
    }

    // Convert code point to UTF-16 bytes
    if (endianness === "BE") {
      utf16Data.push((codePoint >> 8) & 0xff, codePoint & 0xff);
    } else {
      utf16Data.push(codePoint & 0xff, (codePoint >> 8) & 0xff);
    }
  }

  return new Uint8Array(utf16Data).buffer;
};
