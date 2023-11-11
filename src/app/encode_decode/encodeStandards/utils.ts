export const unicodeToAscii = (text: string) => {
  const codeUnits = new Uint16Array(text.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = text.charCodeAt(i);
  }
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = "";
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
};

export const asciiToUnicode = (text: string) => {
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  const charCodes = new Uint16Array(bytes.buffer);
  let result = "";
  for (let i = 0; i < charCodes.length; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
};
