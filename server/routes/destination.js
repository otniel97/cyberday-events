// ====================================================
//      Routes API: Destination
// ====================================================

const express = require('express');
const destinationController = require('../controllers/destination');
const api = express.Router();

// =================================
// Todos los destinos
// =================================
api.get('/all', destinationController.getDestinations);

// ==========================================
// Todos los destinos por estatus
// ==========================================
api.get('/all/:status', destinationController.getDestinationsByStatus);

// ==============================
// Un destino por id
// ==============================
api.get('/:id', destinationController.getDestinationById);

// ===============================
// Crear nuevo destino
// ===============================
api.post('/save', destinationController.saveDestination);

// ====================================
// Actualizar destino
// ====================================
api.put('/:id', destinationController.updateDestination);

// ====================================
// Actualizar status de destino
// ====================================
api.put('/:id/status', destinationController.updateDestinationStatus);

// ====================================
// Eliminar destino
// ====================================
api.delete('/:id', destinationController.deleteDestination);

module.exports = api;