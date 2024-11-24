// // const File = require("../Models/DocSchema");


// // // const uploadFile = async (req, res) => {
// // //   try {
// // //     const { originalname, mimetype, buffer } = req.file;

// // //     const file = new File({
// // //       filename: originalname,
// // //       contentType: mimetype,
// // //       data: buffer,
// // //     });

// // //     await file.save();
// // //     res.status(201).json(req.file);
// // //   } catch (error) {
// // //     res.status(500).send('Error uploading file');
// // //   }
// // // }

// // const uploadFile = async (req, res) => {
// //     try {
// //       const { originalname, mimetype, size } = req.file;
// //       console.log(req.file)
// //       const file = new File({
// //         path: originalname, // You can customize this to a unique path if needed
// //         // lastModified: lastModified,
// //         lastModifiedDate: new Date(), // Use the current date
// //         name: originalname,
// //         size: size,
// //         type: mimetype,
// //       });
  
// //       await file.save();
// //       res.status(201).send('File uploaded successfully');
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).send('Error uploading file');
// //     }
// //   }

// // const GetFileById = async (req, res) => {
// //     try {
// //       const file = await File.findById(req.params.id);
// //       if (!file) {
// //         return res.status(404).send('File not found');
// //       }
  
// //       // Set response headers to indicate file type and disposition
// //       // res.set({
// //       //   'Content-Type': file.contentType,
// //       //   'Content-Disposition': `inline; filename="${file.filename}"`, // For inline display
// //       // });
  
// //       // Send the binary data
// //       res.send(file);
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).send('Error retrieving file');
// //     }
// // }
  
// // module.exports = {
// //     uploadFile,
// //     GetFileById
// // }


// // controllers/documentController.js
// const Document = require('../Models/DocSchema');

// // Upload a file
// exports.uploadDocument = async (req, res) => {
//   try {
//     const newDoc = new Document({
//       fileName: req.file.originalname,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,
//     });

//     await newDoc.save();
//     res.json({ message: 'File uploaded successfully', fileId: newDoc._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to upload file' });
//   }
// };

// // Get file by ID
// exports.getDocumentById = async (req, res) => {
//   try {
//     const doc = await Document.findById(req.params.id);
//     if (!doc || !doc.filePath) {
//       return res.status(404).json({ message: 'Document not found' });
//     }

//     console.log(doc)

//     res.sendFile(doc.filePath, { root: './uploads' });
//   } catch (error) {
//     console.error('Error:', error.message); // Log the error message
//     res.status(500).json({ message: 'Failed to retrieve the document.' });
//   }
// };
