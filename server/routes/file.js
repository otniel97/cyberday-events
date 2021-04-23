// ======================================================
//      Routes API: File Images
// ======================================================

const express = require('express');
const fileService = require('../utils/files');
const api = express.Router();

// ===========================================================
// Obtener archivos type: modelo, fileName: nombre de archivo
// ===========================================================
api.get('/:fileName', fileService.getFile);

module.exports = api;