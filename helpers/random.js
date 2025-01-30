module.exports = function (arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Berilgan massiv noto‘g‘ri yoki bo‘sh.");
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}