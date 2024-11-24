import React from 'react';
import { Link } from 'react-router-dom';
import TitlePage from '@/components/Custom/TitlePage';
import { MdInsertDriveFile, MdImage, MdWeb, MdFileDownload, MdPictureAsPdf, MdTableChart, MdDescription, MdOutlinePictureAsPdf, MdOutlineMergeType, MdSlideshow, MdAutoFixHigh } from 'react-icons/md'; 
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

const conversionOptionsFromPDF = [
  { id: 1, title: 'Fluent Files', description: 'Translate your documents and text seamlessly with enhanced AI Translation systems ', link: 'translate-document-gemini', icon: MdInsertDriveFile, color: 'text-green-500' },
  { id: 2, title: 'Briefly ', description: 'Maximize efficiency with our AI-driven summarization tool. Transform lengthy documents into intelligent, short, readable summaries in seconds', link: 'dsf-summarize-document', icon: MdImage, color: 'text-blue-500' },
  { id: 3, title: 'Smart Edit', description: 'Boost your document readability with sophisticated AI proofreading tool. Ensure your content excels in grammar, style, clarity, and flow.', link: 'dsf-proofread', icon: MdWeb, color: 'text-pink-500' },

];



const GenAi = () => {
  return (
    <>
      <div className='px-4 py-6 md:p-7'>
        <TitlePage title={'GenAI Tools'} />
        <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
          <div>
            {/* <h1 className='font-semibold text-xl mb-3'>Let's Go With Gemini </h1> */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
              {conversionOptionsFromPDF.map(option => (
                <Link 
                  to={option.link} 
                  key={option.id} 
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start relative"
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

export default GenAi;







