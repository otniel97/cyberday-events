// ====================================================
//      Service: Upload and get files
// ====================================================
const fs = require('fs');
const path = require('path');

//=========================================
//Guardar archivos
//=========================================
const uploadFile = async function(req, res) {

    const validExtentionImage = ['jpg', 'jpeg', 'png'];

    let fileUploaded = req.files.image; // El input de tener el name image

    let nameTokenFile = fileUploaded.name.split('.');

    let extention = nameTokenFile[nameTokenFile.length - 1].toLowerCase();

    if (validExtentionImage.indexOf(extention) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones válidas son: ' + validExtention.join(', '),
                ext: extention
            }
        });
    }

    let fileName = `${nameTokenFile[0]}-${ new Date().getMilliseconds() }.${ extention }`

    fileUploaded.mv(`public/images/${fileName}`, (error) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    });
    return fileName
}

//=========================================
//Eliminar archivo
//=========================================
const deleteFile = (type, fileName) => {

    let pathImg = path.resolve(__dirname, `../public/images/${ fileName }`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

//=========================================
//Obtener archivos
//=========================================
const getFile = (req, res) => {

    let noImagePath = path.resolve(__dirname, '../../public/images/no-image.jpg');

    let file = req.params.fileName;

    let pathImg = path.resolve(__dirname, `../../public/images/${ file }`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(noImagePath);
    }

}

module.exports = {
    uploadFile,
    deleteFile,
    getFile
}