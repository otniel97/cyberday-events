// ====================================================
//      Routes API
// ====================================================

const express = require('express');
const app = express();

//destination routes
app.use('/destination', require('./destination'));

//activity routes
app.use('/activity', require('./activity'));

//files routes
app.use('/file', require('./file'));

module.exports = app;