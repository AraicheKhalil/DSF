import React, { useState } from "react";

import { IoCloudUploadSharp } from "react-icons/io5";
import Button from "@/components/Button/Button";
// import { documentTypes } from "../../Assets/Data/InputsData";
// import Radio from "../Inputs/Radio";
// import FileLoader from "../Loader/FileLoader";
// import BtnTabs from "../Button/BtnTabs";
// import JsonFormat from "../ExtractTabs/JsonFormat";

// import KeyValuePair from "../ExtractTabs/KeyValuePair";
// import ResponseFormat from "../ExtractTabs/ResponseFormat";

// import { scanDocument } from "../../redux/Actions";

// import ExtractedResponse from "../ExtractTabs/extractedResponse";
import { scanDocument } from "@/Redux/Actions";
import Filedrop from "@/components/Dropzone/FileDrop";
import { formatResponse } from "@/Utils/ResponseFormatter";

const UploadFilesToDialog = () => {
  const [selectedFile, setSelectedFiles] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("response");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState({
    fileError: "",
    documentType: "",
    response: "",
  });


  if (responseData){
      console.log(responseData)
  }

  function errorHandler(text, type = "fileError") {
    setError((pre) => {
      return { ...pre, [type]: text };
    });
  }

  function handleDocumentType(e) {
    errorHandler(null, "documentType");
    errorHandler(null, "response");
    setDocumentType(e.target.value);
  }

  const onDropImage = (files) => {
    // Check if the dropped file has an allowed extension
    errorHandler(null);
    const allowedExtensions = ["png", "jpg", "jpeg", "pdf"];
    const fileExtension = files[0].name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      errorHandler(null, "documentType");
      errorHandler(null, "response");
      errorHandler(null);
      setSelectedFiles(files[0]);
    } else {
      // Display an error message or handle the case where the file is not allowed
      errorHandler("Invalid file type. Please upload a PNG ,JPG or JPEG file.");
    }
  };

  async function handleSubmit({setFileToResult}) {
    // if (!documentType) {
    //   errorHandler("**Please select a document type**", "documentType");
    //   return;
    // } else {
    if (!selectedFile) {
      errorHandler("**Please select a file**", "fileError");
      return;
    }
    setFileUpload(true);
    setLoading(true);
    scanDocument(selectedFile)
      .then((response) => {
        let result = formatResponse(response?.data);
        if (!result) {
          throw new Error(
            "Sorry we cannot provide information about this document for some reason"
          );
        }
        setResponseData(result);
        setLoading(false);
        setFileUpload(true);
      })
      .catch((error) => {
        console.error(error);
        errorHandler(
          error.message || "**Something went wrong while scanning file **",
          "response"
        );
        setLoading(false);
        setFileUpload(false);
      });
    // }
  }


// console.log(selectedFile?.name)
// console.log(selectedFile?.lastModifiedDate)
// console.log(selectedFile?.path)
// console.log(documentType)


  return (
    <div data-aos="zoom-in" className="w-full pt-3 px-12 pb-12 bg-gray-50 rounded-xl">
      <div className="w-full flex justify-center items-center">
      </div>
      <div className="w-full flex justify-center items-stretch gap-10 flex-wrap mt-8">
        <div className={"flex-grow basis-[300px] max-w-[900px]"}>
          <Filedrop
            onDrop={onDropImage}
            selectedFiles={selectedFile}
            error={error.fileError}
            icon={<IoCloudUploadSharp />}
            headerText="Drop your image here, or"
            description="Drop files (image, pdf, word) here or click here to extract (max : 3 pages)"
          />
          {error?.response ? (
            <p className="text-[15px] text-red-600">{error.response}</p>
          ) : null}
          <div className="w-full flex justify-center items-center mt-5 ">
            <Button onClick={handleSubmit} text="Extract"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFilesToDialog;