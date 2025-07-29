const multer = require('multer');

//configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // append timestamp to the original file name
    },
});

//File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes=[
        'image/jpeg',
        'image/png',
        'image/jpg'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // accept the file
    } else {
        cb(new Error('Only .jpeg, .jpg, .png formats are allowwed'), false); // reject the file
    }
};

const upload = multer({
    storage: storage, fileFilter});

module.exports = upload;