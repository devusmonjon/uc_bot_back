require("number-brm")
module.exports = changePrice = (text, price, spaced = false) => {
    text = text.replace(/{{(.*?)}}/g, (_, p1) => {
        console.log(p1);
        return !spaced ? (p1 * price) : (p1 * price).brm();
    });
    return text
}