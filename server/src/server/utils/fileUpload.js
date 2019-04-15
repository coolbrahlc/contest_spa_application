const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports.fileUpload = upload.fields([{ name: 'nameFile', maxCount: 3 },
                                      { name: 'taglineFile', maxCount: 3 },
                                      { name: 'logoFile', maxCount: 3 },
                                      { name: 'entryFile', maxCount: 3 }]);
