const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports.fileUpload = upload.fields([{ name: 'NameFile', maxCount: 3 },
                                      { name: 'TaglineFile', maxCount: 3 },
                                      { name: 'LogoFile', maxCount: 3 }]);
