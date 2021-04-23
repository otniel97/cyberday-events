// ====================================================
//      Routes API: Activity
// ====================================================

const express = require('express');
const activityController = require('../controllers/activity');
const api = express.Router();

// =================================
// Todas las actividades
// =================================
api.get('/all', activityController.getActivities);

// ==========================================
// Todas las actividades por estatus
// ==========================================
api.get('/all/:status', activityController.getActivitiesByStatus);

// ==============================
// Una actividad por id
// ==============================
api.get('/:id', activityController.getActivityById);

// ===============================
// Crear nueva actividad
// ===============================
api.post('/save', activityController.saveActivity);

// ====================================
// Actualizar actividad
// ====================================
api.put('/:id', activityController.updateActivity);

// ====================================
// Actualizar status de actividad
// ====================================
api.put('/:id/status', activityController.updateActivityStatus);

// ====================================
// Eliminar actividad
// ====================================
api.delete('/:id', activityController.deleteActivity);

module.exports = api;