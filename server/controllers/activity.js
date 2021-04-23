// ===================================
//        Activity Controller
// ===================================
const activityService = require('../services/activity');

//======================================
//Mostrar todos los actividads
//======================================
async function getActivities(req, res) {
    return activityService.getActivities(req, res);
}

//=================================================
//Mostrar todos los actividads por estatus
//=================================================
async function getActivitiesByStatus(req, res) {
    return activityService.getActivitiesByStatus(req, res);
}

//=================================
//Mostrar actividad por id
//=================================
async function getActivityById(req, res) {
    return activityService.getActivityById(req, res);
}

//==============================
//Crear actividad
//==============================
async function saveActivity(req, res) {
    return activityService.saveActivity(req, res)
}

//==============================
// Actualizar actividad
//==============================
async function updateActivity(req, res) {
    return activityService.updateActivityById(req, res);
}

//=====================================
// Cambiar status de actividad
//=====================================
async function updateActivityStatus(req, res) {
    return activityService.updateActivityStatusById(req, res);
}

//==============================
//  Eliminar actividad
//==============================
async function deleteActivity(req, res) {
    return activityService.deleteActivityById(req, res);
}

module.exports = {
    getActivities,
    getActivitiesByStatus,
    getActivityById,
    saveActivity,
    updateActivity,
    updateActivityStatus,
    deleteActivity
}