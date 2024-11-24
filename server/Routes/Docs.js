// // const express = require('express');
// // const router = express.Router();
// // const multer = require("multer");
// // // const storage = multer.diskStorage({
// // //     destination: function (req, file, cb) {
// // //       cb(null, '/tmp/my-uploads')
// // //     },
// // //     filename: function (req, file, cb) {
// // //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// // //       cb(null, file.fieldname + '-' + uniqueSuffix)
// // //     }
// // // })
// // const storage = multer.memoryStorage()

// // const upload = multer({ storage: storage })
// // const { uploadFile , GetFileById} = require('../Controllers/DocsController')



// // router.post('/upload', upload.single('file') ,uploadFile);
// // router.get('/files/:id',GetFileById)

// // module.exports = router;



// // routes/documentRoutes.js
// const express = require('express');
// const { uploadDocument,
//     getDocumentById
// } = require('../Controllers/DocsController');

// const router = express.Router();
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });

// // Multer setup
// // const storage = multer.memoryStorage(); // Stores file in memory as buffer
// const upload = multer({ storage });

// // Upload route
// router.post('/upload', upload.single('file'), uploadDocument);

// // Get route
// router.get('/:id', getDocumentById);

// module.exports = router;
