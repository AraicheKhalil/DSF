import axios from "axios";

export const scanDocument = async (payload) => {
  try {
    const formData = new FormData();
    formData.append(`files`, payload);
    const response = await axios.post(
      "https://dsfsmd.fly.dev/process-document/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// export const scanDocument = async (files) => {
//   const formData = new FormData();
//   files.forEach(file => {
//     formData.append('files', file);
//   });

//   try {
//     const response = await axios.post('http://dsfsmd-container.eastus.azurecontainer.io:8000/process-document/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     console.log(response.data[0])
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading files:', error);
//     throw error;
//   }
// };