const CONSTANS = require("../constants");

module.exports = (text) => {
    text = text.replace(/{{(.*?)}}/g, (match, p1) => {
        console.log(p1);
        return CONSTANS[p1] ? CONSTANS[p1] : match;
    });
    return text
}