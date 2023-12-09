export default function TruncateString(str, maxLength) {
    if (str) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength - 3) + '...';
        } else {
            return str;
        }
    }
}
