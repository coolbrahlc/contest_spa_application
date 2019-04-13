module.exports.addDays = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + parseInt(days));
    return result;
};
