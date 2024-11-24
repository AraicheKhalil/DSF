// import { AppContext } from '@/context/AppContext';
// import { useContext } from 'react'
// const {auth} = useContext(AppContext)
// const {token} = auth;
import axios from 'axios';

export const uploadFilesTest = async (files,documentType) => {
  const url = `https://www.dsfsmartdoc.com/${documentType}/`;
  console.log(url)
  const formData = new FormData();

  files.forEach(file => {
    
    formData.append('files', file.file);
  });

  try {
    
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseData = response.data; // Assume this is an array like ["data1", "data2", ...]

    const updatedFiles = files.map((file, index) => ({
      id: file.id,
      file: responseData[index] || '', // Update the file property with response data
      previewUrl: file.previewUrl, 
    }));

    console.log(updatedFiles);


    return updatedFiles;

  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};



export const uploadFiles = async (files,documentType) => {
  // console.log(documentType)
  let type = await documentType;
  console.log(`https://dsfsmd.fly.dev/${type}/`)
  let url = `https://dsfsmd.fly.dev/${type}/`
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};




const endpoints = {
  'pdf-to-image': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-image/',
  'image-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/image-to-pdf/',
  'excel-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/excel-to-pdf/',
  'pdf-to-excel': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-excel/',
  'html-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/html-to-pdf/',
};

export const ConvertFiles = async (files, conversionType) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append(conversionType === 'image-to-pdf' ? 'files' : 'file', file);  // Handle multiple files for image-to-pdf
  });

  try {
    const response = await axios.post(endpoints[conversionType], formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob',  // This is important to handle binary data
    });

    // Check if 'content-disposition' exists and contains the filename
    let filename = 'downloaded_file';
    if (response.headers['content-disposition']) {
      const disposition = response.headers['content-disposition'];
      const filenameMatch = disposition.match(/filename="?(.+)"?/);
      if (filenameMatch && filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }

    return {
      filename: filename,
      blob: response.data
    };
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

export const MergeFiles = async (files,type) => {
  const formData = new FormData();

  files.map((file) => {
    formData.append('files', file);
  });

  try {
    // Send a request to the API based on the selected file type
    const response = await axios.post(`https://www.dsfsmartdoc.com/convert/${type}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob', // Get the response as a blob (binary data)
    });

    console.log(response)

    // // Create a URL for the response blob
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // setMergedFileUrl(url); // Save the URL to state

    return response.data;
  } catch (error) {
    console.error('Error merging files:', error.response?.data || error.message);
  }

  setLoading(false); // Stop loading when response is received
};


export const ToolsResponse = async (files, type, queries) => {
  let url;
  if (queries.pages){
    url = `https://www.dsfsmartdoc.com/convert/${type}/?pages=${queries.pages}`;
  } else if(queries.rangeStart && queries.rangeEnd){
    url = `https://www.dsfsmartdoc.com/convert/${type}/?range_start=${queries.rangeStart}&range_end=${queries.rangeEnd}`;
  } else {
    url = `https://www.dsfsmartdoc.com/${type !== "enhance-file" ? "convert/" : ""}${type}/`;
  }
  const promises = files.map(async file => {
    const formData = new FormData();
    formData.append(type === "image-to-pdf" ? 'files' : 'file', file);  // Use the correct field name expected by the backend
    
    let filename = 'downloaded_file';
    let response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob' ,  // This is important to handle binary data
    })


    return {
      filename: filename,
      blob: response.data
    };
  });

  try {
    const results = await Promise.all(promises);
    return results;  // Return an array of objects containing filenames and blobs
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};


export const GenIAResponse = async ({ file, text, source_lang  , target_lang , tone , summaryLength },type) => {
  try {
    // Create form data
    const formData = new FormData();

    // Append either the file or text depending on which is provided
    if (file) {
      formData.append('file', file);
    } else if (text) {
      formData.append('text', text);
    }

    // Append summary length (this field is required)
    formData.append('summary_length', summaryLength);

    // Append summary length (this field is required)
    formData.append('source_lang', source_lang);

    // Append summary length (this field is required)
    formData.append('target_lang', target_lang);

    // Append summary length (this field is required)
    formData.append('tone', tone);


    // Make the POST request to the API
    const response = await axios.post(
      `https://www.dsfsmartdoc.com/${type}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
        },
      }
    );

    console.log(target_lang,source_lang,summaryLength,tone);
    console.log(response.data);
    // Return the response data
    if ( type == "dsf-summarize-document" ){
      return response.data.summary_text;
    } else if (type == "translate-document-gemini") {
      return response.data.translated_text;
    } else if (type == "dsf-proofread"){
      return response.data.revised_text;
    }
    
  } catch (error) {
    console.error('Error summarizing document:', error);
    throw error;
  }
};


const URL = "http://localhost:5000/api/v1"
const Production = "https://dsf-saas.onrender.com/api/v1"
export const TrackUserSubmissions = async (token,Tool,documentType,responseCount) => {

  const response = await fetch(`${Production}/activities/track`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        "toolCategory": Tool,
        "toolType": documentType,
        "extractionCount": responseCount
    }),
  })

  const data = await response.json();
  
  if (!response.ok) {
    // console.log(data)
    return { 
      access: data.access,
      message: data.message
    };
  }else {
    return { 
      access: data.access,
      message: data.message
    };
  }
}


export const PlayGroundResponse = async (files) => {
  const url = `https://www.dsfsmartdoc.com/process-document/`;
  console.log(url)
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    return response.data;

  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};