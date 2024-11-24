
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from 'lucide-react';
import { MdReviews } from 'react-icons/md';
import { BiExport } from 'react-icons/bi';
// import ExtractedResponse from './ExtractTabs/extractedResponse';
import * as XLSX from 'xlsx';
import SkeletonResponse from '@/components/Custom/skeleton';
import DataTable from '@/components/DataTable';
import ResponseFormat from '@/components/ExtractTabs/ResponseFormat';


// Utility functions to convert JSON to table data
const flattenObject = (obj, parent = '', res = {}) => {
  for (let key in obj) {
    let propName = parent ? `${parent}.${key}` : key;
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        flattenObject(item, `${propName}[${index}]`, res);
      });
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

const jsonToTableData = (json) => {
  if (!json || !Array.isArray(json) || json.length === 0) {
    return { headers: [], rows: [] };
  }

  const flattenedJson = json.map(item => flattenObject(item));
  const headers = Array.from(new Set(flattenedJson.flatMap(item => Object.keys(item))));
  const rows = flattenedJson.map(item => headers.map(header => item[header] || ''));

  return { headers, rows };
};

const jsonToExcel = (json) => {
  const { headers, rows } = jsonToTableData(json);
  // console.log('Headers:', headers);
  // console.log('Rows:', rows);
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  return workbook;
};

const downloadExcel = (workbook, filename) => {
  XLSX.writeFile(workbook, filename);
};

// { activeFile, extractionResults ,loading}

const DocResult = ({ activeFile, extractionResults ,loading }) => {
  const [copied, setCopied] = useState(false);
  // const [Response, setResponse] = useState("false");

  // const [FileToResult, setFileToResult] = useState(null);

  extractionResults = extractionResults.filter(item => {
    return item.id === activeFile.id && item
  })

  console.log(extractionResults[0]?.file)

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const Response = extractionResults[0]?.file;
    const workbook = jsonToExcel(Array.isArray(Response) ? Response : [Response]);
    downloadExcel(workbook, 'export.xlsx');
  };

  const Response = extractionResults[0]?.file;
  const { headers, rows } = jsonToTableData(Array.isArray(Response) ? Response : [Response]);
  // console.log('Response:', Response);
  // console.log('Table Headers:', headers);
  // console.log('Table Rows:', rows);

  const handleJsonDownload = () => {
    const blob = new Blob([JSON.stringify(Response, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.json';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };


  const handleExportUserData = async () => {
    
    const response = await fetch('http://localhost:3000/api/v1/smt/activities/exported-data', {
      method: 'POST',
      body: JSON.stringify(Response),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
      })
      .catch((error) => {
        // Handle any errors
      });

    console.log(response)
  }

  return (
    <div className=" flex flex-col w-full bg-white h-full shadow-lg p-2 pb-0 max-h-screen ">
      <h3 className="  text-lg font-semibold font-Rubik  ml-2 mb-2 ">
        Document Response
      </h3>
      <Tabs defaultValue="JSON" className="max-h-full h-full ">
        <TabsList className="gap-4 bg-none w-full justify-start">
          <TabsTrigger className="text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm" value="JSON">
            JSON
          </TabsTrigger>
          <TabsTrigger className="text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm" value="FINAL RESPONSE">
            Key-Pair{" "}
          </TabsTrigger>
          <TabsTrigger className="text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm" value="EXCEL">
            EXCEL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="JSON" className="  ">
          <div className="text-sm px-2 w-full bg-white  h-screen pb-24 overflow-auto ">              
          {loading ? (
            <SkeletonResponse />
          ) : (
            <div>
              <CopyToClipboard
                text={JSON.stringify(Response, null, 2)}
                onCopy={handleCopy}
              >
                <Button className="text-xs px-3 py-2.5 h-fit">{copied ? "Copied!" : "Copy JSON"}</Button>
              </CopyToClipboard>
              <Button onClick={handleJsonDownload} className="ml-2 text-xs px-3 py-2.5 h-fit">
                Download JSON
              </Button>
              <div className=" mt-3">
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                  {JSON.stringify(Response, null, 2)}
                </pre>
              </div>
            </div>
          )}
          </div>
        </TabsContent>

        <TabsContent value="FINAL RESPONSE" className=" ">
          <div className="text-sm px-2 w-full bg-white  h-screen pb-24 overflow-auto ">
            {loading ? (
              <SkeletonResponse />
            ) : (
              <div className="mb-[50px]">
                <ResponseFormat data={Response} />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="EXCEL">
          <div>
            <Button onClick={handleExport} className="mb-2 ml-2 text-xs px-3 py-2.5 h-fit">Download Excel</Button>
            <DataTable headers={headers} rows={rows} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-2.5 w-full flex text-xs items-center  border-t border-gray-200 bg-gray-50 shadow-inner  justify-evenly ">
        <Button className="bg-green-700 flex items-center gap-2 text-xs shadow-xl">
          <Check size={15} /> Approve
        </Button>
        <Button className="bg-yellow-500 flex items-center gap-2 text-xs shadow-xl">
          <MdReviews size={15} /> Review
        </Button>
        <Button
          className="bg-blue-500 flex items-center gap-2 text-xs shadow-xl"
          onClick={handleExportUserData}
        >
          <BiExport size={15} /> Export
        </Button>
      </div>
    </div>
  );
};

export default DocResult;