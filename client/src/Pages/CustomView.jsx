// // CustomView.js



import React from 'react'

export default function CustomView() {
  return (
    <div>This Page is</div>
  )
}









// import React from 'react';
// import DocumentProcessor from "@/components/DocumentProcessor/DocumentProcessor";

// const CustomView = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <DocumentProcessor />
//     </div>
//   );
// };

// export default CustomView;

























// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { uploadFiles } from "@/api/DocumentResquest"

// const CustomView = () => {
//   const [files, setFiles] = useState([]);

//   const onDrop = useCallback((acceptedFiles) => {
//     const newFiles = acceptedFiles.map(file => Object.assign(file, {
//       preview: URL.createObjectURL(file)
//     }));
//     setFiles(prevFiles => [...prevFiles, ...newFiles]);

//     // Send files to the server
//     uploadFiles(acceptedFiles)
//       .then(response => {
//         console.log('Upload successful:', response);
//       })
//       .catch(error => {
//         console.error('Upload failed:', error);
//       });
//   }, []);

//   const removeFile = (file) => () => {
//     const newFiles = files.filter(f => f !== file);
//     setFiles(newFiles);
//     URL.revokeObjectURL(file.preview);
//   };

//   const renderFiles = () => (
//     files.map(file => (
//       <div key={file.path} style={styles.fileItem}>
//         {file.type.startsWith('image/') && (
//           <img src={file.preview} alt={file.name} style={styles.imagePreview} />
//         )}
//         <p>{file.name}</p>
//         <p>{file.size} bytes</p>
//         <button onClick={removeFile(file)}>Remove</button>
//       </div>
//     ))
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: '.doc,.docx,.pdf,.txt,.jpeg,.jpg,.png,.gif', // Accepting common document types and image types
//     multiple: true
//   });

//   return (
//     <div>
//       <div {...getRootProps({ className: 'dropzone' })} style={styles.dropzone}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       <div style={styles.fileList}>
//         {renderFiles()}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   dropzone: {
//     height : "200px",
//     border: '2px dashed #cccccc',
//     borderRadius: '5px',
//     padding: '20px',
//     textAlign: 'center',
//     cursor: 'pointer',
//     marginBottom: '10px'
//   },
//   fileList: {
//     marginTop: '10px'
//   },
//   fileItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     marginBottom: '10px',
//     border: '1px solid #cccccc',
//     padding: '10px',
//     borderRadius: '5px'
//   },
//   imagePreview: {
//     width: '100px',
//     height: '100px',
//     objectFit: 'cover',
//     marginBottom: '10px'
//   }
// };

// export default CustomView;






// // // CustomView.js
// // import React, { useCallback, useState } from 'react';
// // import { useDropzone } from 'react-dropzone';

// // const CustomView = () => {
// //   const [files, setFiles] = useState([]);

// //   console.log(files)

// //   const onDrop = useCallback((acceptedFiles) => {
// //     setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
// //       preview: URL.createObjectURL(file)
// //     }))]);
// //   }, [files]);

// //   const removeFile = (file) => () => {
// //     const newFiles = files.filter(f => f !== file);
// //     setFiles(newFiles);
// //     URL.revokeObjectURL(file.preview);
// //   };

// //   const renderFiles = () => (
// //     files.map(file => (
// //       <div key={file.path} style={styles.fileItem}>
// //         {file.type.startsWith('image/') && (
// //           <img src={file.preview} alt={file.name} style={styles.imagePreview} />
// //         )}
// //         <p>{file.name}</p>
// //         <p>{file.size} bytes</p>
// //         <button onClick={removeFile(file)}>Remove</button>
// //       </div>
// //     ))
// //   );

// //   const { getRootProps, getInputProps } = useDropzone({
// //     onDrop,
// //     accept: '.doc,.docx,.pdf,.txt,.jpeg,.jpg,.png,.gif', // Accepting common document types and image types
// //     multiple: true
// //   });

// //   return (
// //     <div>
// //       <div {...getRootProps({ className: 'dropzone' })} style={styles.dropzone}>
// //         <input {...getInputProps()} />
// //         <p>Drag 'n' drop some files here, or click to select files</p>
// //       </div>
// //       <div style={styles.fileList}>
// //         {renderFiles()}
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   dropzone: {
// //     height : "200px",
// //     border: '2px dashed #cccccc',
// //     borderRadius: '5px',
// //     padding: '20px',
// //     textAlign: 'center',
// //     cursor: 'pointer',
// //     marginBottom: '10px'
// //   },
// //   fileList: {
// //     marginTop: '10px'
// //   },
// //   fileItem: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'flex-start',
// //     marginBottom: '10px',
// //     border: '1px solid #cccccc',
// //     padding: '10px',
// //     borderRadius: '5px'
// //   },
// //   imagePreview: {
// //     width: '100px',
// //     height: '100px',
// //     objectFit: 'cover',
// //     marginBottom: '10px'
// //   }
// // };

// // export default CustomView;