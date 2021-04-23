// ===================================
//        Destination Controller
// ===================================
const destinationService = require('../services/destination');

//======================================
//Mostrar todos los destinos
//======================================
async function getDestinations(req, res) {
    return destinationService.getDestinations(req, res);
}

//=================================================
//Mostrar todos los destinos por estatus
//=================================================
async function getDestinationsByStatus(req, res) {
    return destinationService.getDestinationsByStatus(req, res);
}

//=================================
//Mostrar destino por id
//=================================
async function getDestinationById(req, res) {
    return destinationService.getDestinationById(req, res);
}

//==============================
//Crear destino
//==============================
async function saveDestination(req, res) {
    return destinationService.saveDestination(req, res)
}

//==============================
// Actualizar destino
//==============================
async function updateDestination(req, res) {
    return destinationService.updateDestinationById(req, res);
}

//=====================================
// Cambiar status de destino
//=====================================
async function updateDestinationStatus(req, res) {
    return destinationService.updateDestinationStatusById(req, res);
}

//==============================
//  Eliminar destino
//==============================
async function deleteDestination(req, res) {
    return destinationService.deleteDestinationById(req, res);
}

module.exports = {
    getDestinations,
    getDestinationsByStatus,
    getDestinationById,
    saveDestination,
    updateDestination,
    updateDestinationStatus,
    deleteDestination
}