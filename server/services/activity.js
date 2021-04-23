// ====================================================
//      ACTIVITY SERVICE
// ====================================================

const Activity = require('../models').Activity;
const Destination = require('../models').Destination;
const { uploadFile } = require('../utils/files');
const { successMsg, errorMsg, notFoundMsg } = require('../utils/responses');
const { validateExpirationDate, validateExpirationTwoDates } = require('../utils/validations');

//==============================================
//Mostrar todas las actividades
//==============================================
async function getActivities(req, res) {
    try {
        const activities = await Activity.findAll({ include: [Destination] });
        successMsg(res, 200, 'correcto', activities)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error);
    }
}

//==============================================
//Mostrar todas las actividades por estatus
//==============================================
async function getActivitiesByStatus(req, res) {
    try {
        const status = req.params.status;
        const activities = await Activity.findAll({ where: { status }, include: [Destination] });
        successMsg(res, 200, 'correcto', activities);
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error);
    }
}

//=================================
//Mostrar actividad por id
//=================================
async function getActivityById(req, res) {
    try {
        const id = req.params.id;
        const activity = await Activity.findOne({ where: { id }, include: [Destination] })
        activity ?
            successMsg(res, 200, 'correcto', activity) :
            notFoundMsg(res, id, 'Actividad');
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear actividad
//==============================
async function saveActivity(req, res) {
    try {
        const { name, url, status, usdPrice, clpPrice, description, startDate, endDate, offerDay, discountRate, inOffer, destinationId } = req.body;

        const destination = await Destination.findOne({ where: { id: destinationId } });
        if (!destination)
            return notFoundMsg(res, destinationId, 'Destino');

        if (!req.files) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Debe ingresar imagen de actividad"
                }
            });
        }

        if (validateExpirationDate(startDate) < 0)
            return res.status(400).json({
                ok: true,
                message: `Error, fecha inicial debe ser mayor o igual a la actual`,
                startDate
            });

        if (validateExpirationTwoDates(startDate, endDate) <= 0)
            return res.status(400).json({
                ok: true,
                message: `Error, fecha final debe ser mayor a la fecha inicial`,
                endDate
            });

        const file = await uploadFile(req, res);

        let newActivity = {
            name,
            url,
            image: file,
            status: parseInt(status) || 1,
            usdPrice,
            clpPrice,
            description,
            startDate,
            endDate,
            offerDay: parseInt(offerDay) || null,
            discountRate: parseInt(discountRate) || null,
            inOffer: parseInt(inOffer) || 0,
            destinationId
        }

        const activity = await Activity.create(newActivity);

        successMsg(res, 200, 'Creación exitosa', activity);
    } catch (error) {
        errorMsg(res, 500, 'Lo sentimos!, hemos  cometido un error', error)
    }
}

//==============================
//Actualizar actividad
//==============================
async function updateActivityById(req, res) {
    try {
        const id = req.params.id;
        const activity = await Activity.findOne({ where: { id } })

        if (!activity)
            return notFoundMsg(res, id, 'Actividad');

        const { name, url, usdPrice, clpPrice, description, startDate, endDate, offerDay, discountRate, inOffer, destinationId } = req.body;

        const destination = await Destination.findOne({ where: { id: destinationId } });
        if (!destination)
            return notFoundMsg(res, destinationId, 'Destino');

        if (startDate >= endDate)
            return res.status(400).json({
                ok: true,
                message: `Error, fecha inicial debe ser menor o igual a fecha final`,
                startDate
            });

        if (req.files) {
            const file = await uploadFile(req, res);
            activity.set({ image: file });
        }

        activity.set({ name, url, usdPrice, clpPrice, description, startDate, endDate, offerDay, discountRate, inOffer, destinationId })
        await activity.save();

        successMsg(res, 200, 'Actualización exitosa', activity);

    } catch (error) {
        console.log(error)
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error);
    }
}

//=====================================
//Activar desactivar actividad
//=====================================
async function updateActivityStatusById(req, res) {
    try {
        const id = req.params.id;
        const activity = await Activity.findOne({ where: { id } })

        if (!activity)
            return notFoundMsg(res, id, 'Actividad');

        activity.status === 1 ? activity.set({ status: 0 }) : activity.set({ status: 1 });

        await activity.save();

        successMsg(res, 200, 'actualización exitosa', activity);

    } catch (error) {
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error);
    }
}

//==================================
//Eliminar actividad por id
//==================================
async function deleteActivityById(req, res) {
    try {
        const id = req.params.id;
        const activity = await Activity.findOne({ where: { id } });
        if (!activity)
            return notFoundMsg(res, id, "Actividad");

        const deleteActivity = await Activity.destroy({ where: { id } });

        successMsg(res, 200, 'Registro eliminado con éxito', deleteActivity);

    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error);
    }
}

module.exports = {
    getActivities,
    getActivitiesByStatus,
    getActivityById,
    saveActivity,
    updateActivityById,
    deleteActivityById,
    updateActivityStatusById,
}