// ====================================================
//      DESTINATION SERVICE
// ====================================================

const Destination = require('../models').Destination;
const Activity = require('../models').Activity;
const { uploadFile } = require('../utils/files');
const { successMsg, errorMsg, notFoundMsg } = require('../utils/responses');

//==============================================
//Mostrar todas los destinos
//==============================================
async function getDestinations(req, res) {
    try {
        const destinations = await Destination.findAll({ include: [Activity] });
        successMsg(res, 200, 'correcto', destinations)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error);
    }
}

//==============================================
//Mostrar todas los destinos por estatus
//==============================================
async function getDestinationsByStatus(req, res) {
    try {
        const status = req.params.status;
        const destinations = await Destination.findAll({ where: { status }, include: [Activity] });
        successMsg(res, 200, 'correcto', destinations);
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error);
    }
}

//=================================
//Mostrar destino por id
//=================================
async function getDestinationById(req, res) {
    try {
        const id = req.params.id;
        const destination = await Destination.findOne({ where: { id }, include: [Activity] })
        destination ?
            successMsg(res, 200, 'correcto', destination) :
            notFoundMsg(res, id, 'Destino');
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear destino
//==============================
async function saveDestination(req, res) {
    try {

        if (!req.files) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Debe ingresar imagen de destino"
                }
            });
        }

        const { name, url, status } = req.body;
        const file = await uploadFile(req, res);

        let newDestination = {
            name,
            url,
            image: file,
            status: parseInt(status) || 1
        }

        const destination = await Destination.create(newDestination);

        successMsg(res, 200, 'Creación exitosa', destination);
    } catch (error) {
        errorMsg(res, 500, 'Lo sentimos!, hemos  cometido un error', error)
    }
}

//==============================
//Actualizar destino
//==============================
async function updateDestinationById(req, res) {
    try {
        const id = req.params.id;
        const destination = await Destination.findOne({ where: { id } })

        if (!destination)
            return notFoundMsg(res, id, 'Destino');

        if (req.files) {
            const file = await uploadFile(req, res);
            destination.set({ image: file });
        }

        const { name, url } = req.body;
        destination.set({ name, url })

        await destination.save();

        successMsg(res, 200, 'Actualización exitosa', destination);

    } catch (error) {
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error);
    }
}

//=====================================
//Activar desactivar destino
//=====================================
async function updateDestinationStatusById(req, res) {
    try {
        const id = req.params.id;
        const destination = await Destination.findOne({ where: { id } })

        if (!destination)
            return notFoundMsg(res, id, 'Destino');

        destination.status === 1 ? destination.set({ status: 0 }) : destination.set({ status: 1 });

        await destination.save();

        successMsg(res, 200, 'actualización exitosa', destination);

    } catch (error) {
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error);
    }
}

//==================================
//Eliminar destino por id
//==================================
async function deleteDestinationById(req, res) {
    try {
        const id = req.params.id;
        const destination = await Destination.findOne({ where: { id } });
        if (!destination)
            return notFoundMsg(res, id, "Destino");

        const deleteDestination = await Destination.destroy({ where: { id } });

        successMsg(res, 200, 'Registro eliminado con éxito', deleteDestination);

    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error);
    }
}

module.exports = {
    getDestinations,
    getDestinationsByStatus,
    getDestinationById,
    saveDestination,
    updateDestinationById,
    deleteDestinationById,
    updateDestinationStatusById,
}