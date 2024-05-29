const basicHashToInt = (hash: number, maxInt: number = 100) =>
    // tslint:disable-next-line:no-bitwise
    Math.abs(((hash / maxInt) % 1) * maxInt) | 0;
const veryBasicHash = (str: string) =>
    // tslint:disable-next-line:no-bitwise
    str.split('').reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0);

export const numberFromString = (text: string, maxInt: number) =>
    basicHashToInt(veryBasicHash(text), maxInt);
export const randomInt = (max: number = 100) =>
    Math.floor(Math.random() * max) + 1;
export const randomCodeWithLetters = (length: number = 10) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return code;
};
