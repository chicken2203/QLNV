export default function StringDataHanldling(obj) {
    if (typeof obj === 'object') {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key]
                    .trim()
                    .replace(/\n{2,}/g, '\n')
                    .replace(/\s{2,}/g, ' ');
            }
        }
    }
    return obj;
}
