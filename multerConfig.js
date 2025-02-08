const path = require('path');
const os = require("os");
const multer = require('multer');

// const storage = multer.memoryStorage();

// const storage = multer.diskStorage({  // Change from memoryStorage to diskStorage
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Save images to 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + '.jpg');
//     }
//   });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, os.tmpdir()); // Store images in the system's temp directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
  });
  

const upload = multer({ storage });

module.exports = upload;
