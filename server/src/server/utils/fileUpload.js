const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' });
import path from 'path';

const storage = multer.diskStorage({
    destination: './uploads/',
    limits: {
        fileSize: 1000000 * 90
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

module.exports.fileUpload = multer({ storage: storage }).fields([{ name: 'nameFile', maxCount: 3 },
    { name: 'taglineFile', maxCount: 3 },
    { name: 'logoFile', maxCount: 3 },
    { name: 'profilePic', maxCount: 1 },
    { name: 'entryFile', maxCount: 3 }]);


module.exports.getFile = async (req, res, next) => {
    res.download(path.join(__dirname, '../../../uploads/', req.params.name));
};

