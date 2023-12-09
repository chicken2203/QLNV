export const wordsLength = (value) => {
    const words = value.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n').split(' ');
    for (const word of words) {
        if (word.length > 7) {
            return false;
        }
    }
    return true;
};

export const vietnameseName = (value) => {
    const re = /^[\p{L}\s'-]*$/gu;
    return re.test(value);
};

export const lengthLessThan50 = (value) => {
    const words = value.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
    return words.length < 50;
};
export const lengthLessThan100 = (value) => {
    const words = value.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
    return words.length < 100;
};
export const lengthLessThan250 = (value) => {
    const words = value.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
    return words.length < 250;
};
export const lengthLessThan2000 = (value) => {
    const words = value.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
    return words.length < 2000;
};
