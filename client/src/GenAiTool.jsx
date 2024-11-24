import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TitlePage from '@/components/Custom/TitlePage';
import { GenIAResponse, TrackUserSubmissions,  } from '@/api/DocumentResquest';
import { useDropzone } from 'react-dropzone';
import { AlertCircle, ArrowUpLeftFromSquare, CloudSnow, Cog, Files, Sparkles, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { format } from 'date-fns';
import { FaFileLines } from 'react-icons/fa6';
import { SkeletonResponseGenAi } from './components/Custom/skeleton';
import { Label } from './components/ui/label';
import { Checkbox } from './components/ui/checkbox';
import { AppContext } from './context/AppContext';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';



const ToolsTypes = () => {

  const [jsonData, setJsonData] = useState('');
  const [mergedPdfs, setMergedPdfs] = useState(null); // Store the merged PDF URL
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null); // Store the merged PDF URL
  
  const [file, setFile] = useState(null);
  const [text, setText] = useState(""); 
  const [summaryLength, setSummaryLength] = useState(""); 
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(null);
  const [target_lang, setTarget_lang] = useState('');
  const [source_lang,setSource_lang] = useState("");
  const [tone,setTone] = useState("");
  const [copied , setCopied] = useState(null);
  const [isChecked,setisChecked] = useState(false);
  const [queries , setQueries] = useState({
    politeness : false,
    clarity : false,
    brevity : false,
    professionalism : false
  });
  const textAreaRef = useRef(null);
  const { auth , documentType , setDocumentType } = useContext(AppContext)
  const {token} = auth;
  const params = useParams(); 
  let type = params.type;
  const Tool = "GenAI";

  const ValideSummearize = ["dsf-summarize-document"];
  const IsValideSummearize = ValideSummearize.includes(type);

  const validtranslate = ["translate-document-gemini"];
  const isValidtranslate = validtranslate.includes(type);

  const ValideProofread = ["dsf-proofread"];
  const isValideProofread = ValideProofread.includes(type);
  
  const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
      };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleInputChange = (e) => {
    setText(e.target.value);
    
    // Resize the textarea to fit content
    textAreaRef.current.style.height = "auto";  // Reset the height
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;  // Set the height to match the content
  };

//   const handleFileUpload = (file) => {
//     summarizeDocument({ file, summaryLength: 'short' })
//       .then((data) => {
//         console.log('Summarized document:', data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

 

  console.log(file)
  
  const handleTextInput = async () => {

    try {
      setUploading(true);
      const trackResponse = await TrackUserSubmissions(token, "GenAI", type, 1);
      console.log(trackResponse);
      if (trackResponse.access) {
        const response = await GenIAResponse({ text, target_lang : target_lang,
          source_lang : source_lang , tone : tone, summaryLength: summaryLength },type);
        const data = await response;
        setResponse(data);
        setUploading(false);
      } else {
        setError(trackResponse.message);
      }
    } catch (error) {
        setUploading(false);
        console.log("no text found")
    }
  };

  const handleFileInput = async () => {
    try {
        setUploading(true);
        const trackResponse = await TrackUserSubmissions(token, "GenAI", type, 1);
        if(trackResponse.access){
          const response = await GenIAResponse({ file, target_lang : target_lang,
            source_lang : source_lang, tone : tone, summaryLength: summaryLength  },type);
          const data = await response;
          setResponse(data);
          setUploading(false);
        }else {
          setError(trackResponse.message);
        }
    } catch (error) {
        setUploading(false);
        console.log("no text found")
    }
  };

  const formatSummaryResponse = (response) => {
  
    // Remove Markdown headers like '## Summary (Short)'
    let cleanedText = JSON.stringify(response)
    .replace(/^#+[^\n]*\n+/, '')             // Remove headers that start with any number of '#'
    .replace(/^##[^\n]*\n+/, '\n')             // Remove Markdown headers like '## Node.j
    .replace(/\\n\\n/g, '\n')                   //  Replace '/n' with ' . '
    .replace(/\*/, '')  
    .trim();                                 // Trim leading and trailing spaces/newlines
  
      setResponse(cleanedText)
  };
  


  // const handleCopy = () => {
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

  const handleCopy = () => {

    // Copy text to clipboard
    navigator.clipboard.writeText(response).then(() => {
      // Change button text to "Copied!"
      setCopied(true);
      
      // Revert button text back to "Copy Text" after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  useEffect(() => {
    if (error ) {
      const timer = setTimeout(() => {
        setError("")
      }, 10000) // Clear messages after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <>
      <div className='px-4 py-6 md:p-7 relative'>
      <div className="w-full max-w-md fixed top-4 z-50 px-4">
      {error && (
          <Alert variant="destructive" className="bg-orange-100 opacity-95 border-orange-400 text-orange-800 animate-in fade-in-50 slide-in-from-top-full duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upgrade membership</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
        <Link to={'/dashboard/gen_ai'} className='flex gap-2 items-center bg-gray-100 w-fit px-3 py-2 rounded-md font-medium mb-4 border shadow-lg text-xs '>
          <ArrowUpLeftFromSquare size={12} />
          <p>Back To GenAi</p>
        </Link>
        <h1 className='font-poppins text-2xl font-bold mb-4'>{isValidtranslate ? "Translate Your Document" : isValideProofread ? "Refine and Enhance with Smart Edit's AI" : "Summarize Your Document"}</h1>
        <div className='flex w-full gap-6'>
        <Tabs defaultValue="Text" className="w-1/2 ">
            <TabsList className="grid w-full grid-cols-2 shadow-md">
                <TabsTrigger value="Text">Text</TabsTrigger>
                <TabsTrigger value="File">File</TabsTrigger>
            </TabsList>
            {/* options target */}
            
            <TabsContent value="Text" className="relative">
                {
                    text && (
                        <button onClick={() => setText("")} className={`right-2 ${isValidtranslate ? "top-28" : "top-[70px]"} text-gray-500 absolute hover:bg-gray-200 rounded-full p-1`}>
                            <X />
                        </button>
                    )
                }
                <div className='flex gap-2'>
                    {
                        IsValideSummearize && (
                          <div className='w-full'>
                            <Input placeholder="Summary Length : Short, long, ...." value={summaryLength} onChange={(e) => setSummaryLength(e.target.value)} required className="mb-2 bg-muted shadow"/>
                          </div>
                        )

                    }
                    {
                        isValidtranslate && (
                            <div className='w-full'>
                                <Input placeholder="Original Langue : English ...." value={source_lang} onChange={(e) => setSource_lang(e.target.value)} required className="mb-2 shadow bg-muted" disabled={isChecked} />
                                <Input placeholder="Target Langue : Spanish, turkish, ...." value={target_lang} onChange={(e) => setTarget_lang(e.target.value)} required className="mb-2  shadow bg-muted"/>
                                <div className="flex items-center space-x-2 mb-2 mt-0">
                                  <Checkbox checked={isChecked} onClick={() => setisChecked(prev => !prev)}  className=" w-[12px] h-[12px] text-gray-500 border-gray-500" id="terms" />
                                  <Label className="text-gray-500 text-xs" htmlFor="terms">Use Auto Detect language</Label>
                                </div>
                            </div>
                        )
                    }
                    {
                      isValideProofread && (
                        <div className='w-full'>
                          <Input placeholder="tone : neutral ...." value={tone} onChange={(e) => setTone(e.target.value)} required className="mb-2 shadow  bg-muted" disabled={isChecked}/>
                          <div className="flex items-center space-x-2 mb-2 mt-0">
                              <Checkbox checked={isChecked} onClick={() => setisChecked(prev => !prev)}  className=" w-[12px] h-[12px] text-gray-500 border-gray-500" id="terms" />
                              <Label className="text-gray-500 text-xs" htmlFor="terms">Use Auto Detect tone</Label>
                            </div>
                        </div>
                      )
                    }
                    <Button className="bg-gray-900 hover:bg-gray-700 shadow" onClick={handleTextInput} >
                      {uploading ? (isValidtranslate ? "Translating..." : isValideProofread ? "Enhancing..." :"Summarizing...") : (
                        (isValidtranslate ? "Translate" : isValideProofread ? "Enhance" :"Summarize")
                      )}
                    </Button>
                </div>
                <textarea
                    ref={textAreaRef}
                    value={text}
                    onChange={handleInputChange}
                    className="min-h-[350px] w-full p-5 shadow placeholder:text-muted-foreground pr-14 border border-gray-300 rounded-md resize-none overflow-hidden focus:outline-none leading-7 "
                    placeholder="Start typing..."
                />
            </TabsContent>
            <TabsContent value="File">
                <div className='flex gap-2'>
                    {
                        IsValideSummearize && (
                            <Input placeholder="Summary Length : Short, long, ...." value={summaryLength} onChange={(e) => setSummaryLength(e.target.value)} required className="mb-2 shadow bg-muted"/>
                        )

                    }
                    {
                        isValidtranslate && (
                            <div className='w-full mb-2'>
                                <div>
                                  <Input placeholder="Original Langue : English ...." value={source_lang} onChange={(e) => setSource_lang(e.target.value)} required className="mb-2 shadow bg-muted" disabled={isChecked}/>
                                   <Input placeholder="Target Langue : Spanish, turkish, ...." value={target_lang} onChange={(e) => setTarget_lang(e.target.value)} required className="mb-2 shadow bg-muted "/>
                                  <div className="flex items-center space-x-2 mb-1 mt-0">
                                    <Checkbox checked={isChecked} onClick={(e) => setisChecked(prev => !prev)}  className=" w-[12px] h-[12px] text-gray-500 border-gray-500" id="terms" />
                                    <Label className="text-gray-500 text-xs" htmlFor="terms">Use Auto Detect language</Label>
                                  </div>
                                </div>
                            </div>
                        )
                    }
                    {
                      isValideProofread && (
                        <div className='w-full'>
                          <Input placeholder="tone : neutral ...." value={tone} onChange={(e) => setTone(e.target.value)} required className="mb-2 shadow bg-muted" disabled={isChecked}/>
                          <div className="flex items-center space-x-2 mb-2 mt-0">
                              <Checkbox checked={isChecked} onClick={() => setisChecked(prev => !prev)}  className=" w-[12px] h-[12px] text-gray-500 border-gray-500" id="terms" />
                              <Label className="text-gray-500 text-xs" htmlFor="terms">Use Auto Detect tone</Label>
                            </div>
                        </div>
                      )
                    }
                    <Button className="bg-gray-900 hover:bg-gray-700 " onClick={handleFileInput} >{uploading ? (isValidtranslate ? "Translating..." : isValideProofread ? "Enhancing..." :"Summarizing...") : (
                        (isValidtranslate ? "Translate" : isValideProofread ? "Enhance" :"Summarize")
                      )}</Button>
                </div>
                 <div 
                    {...getRootProps()}
                    className={`bg-[#F5F5F5] border border-gray-300 min-h-[350px]  rounded-lg ${!file && "p-6 text-center flex items-center justify-center"} `}
                  >
                    <input {...getInputProps() } className='' />
                    {isDragActive ? (
                      <p>Drop the file here...</p>
                    ) : (
                      <div className=''>
                        {
                          file  ?
                            <div className='bg-gray-200 p-4 rounded-md  mt-2 mx-2 flex items-center gap-5  '>
                              <div className=' rounded-lg flex justify-center items-center p-2'>
                                  <FaFileLines className='text-gray-500 text-3xl' />
                              </div>
                              <div className="flex-1 text-[#8194aa] text-xs">
                                      <p className='font-medium text-gray-600'>{file.name}</p>
                                      <div className='flex flex-col'>
                                          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                                          <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
                                      </div>
                                      <button
                                          onClick={() => setFile(null)}
                                          className="text-red-500  mt-1 hover:underline"
                                      >
                                          Delete
                                      </button>
                                  </div>
                            </div>
                           : (
                            <div className='w-1/2 mx-auto'>
                              <img src="https://ssl.gstatic.com/translate/drag_and_drop.png" alt='image' />
                              <h3 className='mt-4 font-medium text-xl text-zinc-700'>Drag and drop</h3>
                            </div>
                          )
                          
                        }
                      </div>
                    )}
                  </div>
            </TabsContent>
        </Tabs>
            <div className='border border-gray-200 w-1/2 rounded-lg p-6 bg-[#F5F5F5] leading-7 shadow-md'>
            <div className='w-full flex justify-between items-center mb-5'>
              <h1 className='font-semibold font-Rubik text-xl '>{isValidtranslate ? "Translated" : isValideProofread ? "Enhanced" : "Summarizing"} Text</h1>
              {<Button onClick={() => handleCopy()} className='bg-gray-900 h-fit py-2 px-3 text-xs'>{copied ? "Copied!" : "Copy "}</Button>}
            </div>

             {
              
                <div> {uploading ? <SkeletonResponseGenAi /> : response || <p className='italic text-gray-400 text-xl font-extrabold'> . . .</p>} </div>
              
             }
                
            </div>
        </div>

      </div>
    </>
  );
};

export default ToolsTypes;























