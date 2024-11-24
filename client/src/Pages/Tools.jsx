// import React from 'react';
// import { Link } from 'react-router-dom';
// import TitlePage from '@/components/Custom/TitlePage';
// import { MdInsertDriveFile, MdImage, MdWeb, MdFileDownload, MdPictureAsPdf, MdTableChart, MdDescription, MdOutlinePictureAsPdf, MdOutlineMergeType, MdSlideshow, MdAutoFixHigh } from 'react-icons/md'; 


// const conversionOptionsFromPDF = [
//   { id: 1, title: 'PDF To Excel', description: 'Convert PDF to Excel or CSV online for free. Extract table data from PDF', link: 'pdf-to-excel', icon: MdInsertDriveFile, color: 'text-green-500' },
//   { id: 2, title: 'PDF To Image', description: 'Get PDF pages converted to JPG, PNG or TIFF images', link: 'pdf-to-image', icon: MdImage, color: 'text-blue-500' },
//   { id: 6, title: 'HTML To PDF', description: 'Convert web pages or HTML files to PDF documents', link: 'html-to-pdf', icon: MdWeb, color: 'text-pink-500' },
//   { id: 7, title: 'Image To PDF', description: 'Convert Images to PDF', link: 'image-to-pdf', icon: MdImage, color: 'text-yellow-500' },
//   { id: 8, title: 'Excel To PDF', description: 'Convert Excel spreadsheets to PDF documents', link: 'excel-to-pdf', icon: MdFileDownload, color: 'text-green-700' },
//   // Update for id 9 to 12
//   { id: 9, title: 'PDF to Docx', description: 'Convert PDF to editable Word documents (DOCX)', link: 'pdf-to-docx', icon: MdDescription, color: 'text-blue-500' },
//   { id: 10, title: 'Json To CSV', description: 'Convert JSON data to CSV format easily', link: 'json-to-csv', icon: MdTableChart, color: 'text-red-500' },
//   // { id: 11, title: 'Json to Table', description: 'Convert JSON data into an easy-to-read table format', link: 'json-to-table', icon: MdTableChart, color: 'text-orange-500' },
//   { id: 12, title: 'Docx To PDF', description: 'Convert Word documents (DOCX) to PDF format', link: 'docx-to-pdf', icon: MdPictureAsPdf, color: 'text-purple-500' },
// ];


// const conversionOptionsToPDF = [
//   // Updated for id 13 to 16
//   { id: 13, title: 'Split PDF', description: 'Split a PDF document into multiple smaller files', link: 'split-pdf', icon: MdOutlinePictureAsPdf, color: 'text-red-500' },
//   { id: 14, title: 'Merge PDF', description: 'Combine multiple PDF files into a single document', link: 'merge-pdfs', icon: MdOutlineMergeType, color: 'text-blue-500' },
//   { id: 15, title: 'Merge PPTS', description: 'Merge multiple PowerPoint presentations into one PDF', link: 'merge-ppts', icon: MdSlideshow, color: 'text-orange-500' },
//   { id: 16, title: 'Enhance File', description: 'Improve the quality of PDF files for better readability', link: 'enhance-file', icon: MdAutoFixHigh, color: 'text-green-500' },
// ];


// const Tools = () => {
//   return (
//     <>
//       <div className='px-4 py-6 md:p-7'>
//         <TitlePage title={'Document Tools'} />
//         <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
//           <div>
//             <h1 className='font-semibold text-xl mb-3'>Convert From PDF</h1>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//               {conversionOptionsFromPDF.map(option => (
//                 <Link 
//                   to={option.link} 
//                   key={option.id} 
//                   className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start"
//                 >
//                   <option.icon className={`text-2xl ${option.color} mr-3`} />
//                   <div>
//                     <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
//                     <p className="text-gray-600 text-sm">{option.description}</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className='mt-12'>
//             <h1 className='font-semibold text-xl mb-3'>Advenced Tools</h1>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//               {conversionOptionsToPDF.map(option => (
//                 <Link 
//                   to={option.link} 
//                   key={option.id} 
//                   className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start"
//                 >
//                   <option.icon className={`text-2xl ${option.color} mr-3`} />
//                   <div>
//                     <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
//                     <p className="text-gray-600 text-sm">{option.description}</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

         
//         </div>         
//       </div>
//     </>
//   );
// };

// export default Tools;





























import React from 'react';
import { Link } from 'react-router-dom';
import TitlePage from '@/components/Custom/TitlePage';
import { MdInsertDriveFile, MdImage, MdWeb, MdFileDownload, MdPictureAsPdf, MdTableChart, MdDescription, MdOutlinePictureAsPdf, MdOutlineMergeType, MdSlideshow, MdAutoFixHigh } from 'react-icons/md'; 

const conversionOptionsFromPDF = [
  { id: 1, title: 'PDF To Excel', description: 'Convert PDF to Excel or CSV online for free. Extract table data from PDF', link: 'pdf-to-excel', icon: MdInsertDriveFile, color: 'text-green-500' },
  { id: 2, title: 'PDF To Image', description: 'Get PDF pages converted to JPG, PNG or TIFF images', link: 'pdf-to-image', icon: MdImage, color: 'text-blue-500' },
  { id: 6, title: 'HTML To PDF', description: 'Convert web pages or HTML files to PDF documents', link: 'html-to-pdf', icon: MdWeb, color: 'text-pink-500' },
  { id: 7, title: 'Image To PDF', description: 'Convert Images to PDF', link: 'image-to-pdf', icon: MdImage, color: 'text-yellow-500' },
  { id: 8, title: 'Excel To PDF', description: 'Convert Excel spreadsheets to PDF documents', link: 'excel-to-pdf', icon: MdFileDownload, color: 'text-green-700' },
  // Update for id 9 to 12
  { id: 9, title: 'PDF to Docx', description: 'Convert PDF to editable Word documents (DOCX)', link: 'pdf-to-docx', icon: MdDescription, color: 'text-blue-500' },
  { id: 10, title: 'Json To CSV', description: 'Convert JSON data to CSV format easily', link: 'json-to-csv', icon: MdTableChart, color: 'text-red-500' },
  // { id: 11, title: 'Json to Table', description: 'Convert JSON data into an easy-to-read table format', link: 'json-to-table', icon: MdTableChart, color: 'text-orange-500' },
  { id: 12, title: 'Docx To PDF', description: 'Convert Word documents (DOCX) to PDF format', link: 'docx-to-pdf', icon: MdPictureAsPdf, color: 'text-purple-500' },
];

const conversionOptionsToPDF = [
  // Updated for id 13 to 16
  { id: 13, title: 'Split PDF', description: 'Split a PDF document into multiple smaller files', link: 'split-pdf', icon: MdOutlinePictureAsPdf, color: 'text-red-500' },
  { id: 14, title: 'Merge PDF', description: 'Combine multiple PDF files into a single document', link: 'merge-pdfs', icon: MdOutlineMergeType, color: 'text-blue-500' },
  { id: 15, title: 'Merge PPTS', description: 'Merge multiple PowerPoint presentations into one PDF', link: 'merge-ppts', icon: MdSlideshow, color: 'text-orange-500' },
  { id: 16, title: 'Enhance File', description: 'Improve the quality of PDF files for better readability', link: 'enhance-file', icon: MdAutoFixHigh, color: 'text-green-500' },
];

const Tools = () => {
  return (
    <>
      <div className='px-4 py-6 md:p-7'>
        <TitlePage title={'Convert Your Files'} />
        <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
          <div>
            <h1 className='font-semibold text-xl mb-3'>Convert From PDF</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {conversionOptionsFromPDF.map(option => (
                <Link 
                  to={option.link} 
                  key={option.id} 
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start"
                >
                  <option.icon className={`text-2xl ${option.color} mr-3`} />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className='mt-12'>
            <h1 className='font-semibold text-xl mb-3'>Convert To PDF</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {conversionOptionsToPDF.map(option => (
                <Link 
                  to={option.link} 
                  key={option.id} 
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start"
                >
                  <option.icon className={`text-2xl ${option.color} mr-3`} />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>         
      </div>
    </>
  );
};

export default Tools;







