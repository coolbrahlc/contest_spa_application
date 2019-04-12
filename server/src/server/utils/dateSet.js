module.exports.addDays = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + parseInt(days));
    return result;
};

    //
    // function addDays(date, days) {
    //     const result = new Date(date);
    //     result.setDate(result.getDate() + days);
    //     return result;
    // }