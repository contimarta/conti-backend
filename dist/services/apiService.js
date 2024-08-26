import StringLength from "../models/StringLength.js";
const countCharacters = (str) => {
    return str.length;
};
const addStringLengthToDatabase = async (stringLength, userId) => {
    const newStringLength = new StringLength({
        stringLength,
        user: userId,
    });
    await newStringLength.save();
};
const getStringAverageValue = async (userId) => {
    const documents = await StringLength.find({ user: userId });
    const totalStringLength = documents.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.stringLength);
    }, 0);
    if (documents.length === 0) {
        return "0.00";
    }
    return (totalStringLength / documents.length).toFixed(2);
};
export default {
    countCharacters,
    addStringLengthToDatabase,
    getStringAverageValue,
};
