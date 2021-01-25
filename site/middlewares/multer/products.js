const multer = require('multer');
const path = require('path');
const publicImagesPath = path.resolve(__dirname, '../../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(publicImagesPath, 'products'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,  
    fileFilter: (req, file, cb) => {
        const acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
        const isAccepted = acceptedExtensions.includes(path.extname(file.originalname));
        if (!isAccepted){
            req.files = [...req.files, file];
        }
        cb(null, isAccepted);
    }
})

module.exports=upload