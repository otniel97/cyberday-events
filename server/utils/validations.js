// ====================================================
//      Validations
// ====================================================

const moment = require('moment');

function validateExpirationDate(date) {
    const expiration = moment(date).format('YYYY-MM-DD');
    const today = moment(new Date()).format('YYYY-MM-DD');
    const day = moment(expiration).diff(moment(today), 'days');
    return day;
}

function validateExpirationTwoDates(startDate, endDate) {
    const init = moment(startDate).format('YYYY-MM-DD');
    const end = moment(endDate).format('YYYY-MM-DD');
    const day = moment(end).diff(moment(init), 'days');
    return day;
}

module.exports = {
    validateExpirationDate,
    validateExpirationTwoDates
}