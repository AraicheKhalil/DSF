
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from 'lucide-react';
import { MdReviews } from 'react-icons/md';
import { BiExport } from 'react-icons/bi';
// import ExtractedResponse from './ExtractTabs/extractedResponse';
// import ResponseFormat from './ExtractTabs/ResponseFormat';
// import DataTable from './DataTable';

import * as XLSX from 'xlsx';
import ResponseFormat from '@/components/ExtractTabs/ResponseFormat';
import DataTable from '@/components/DataTable';
import SkeletonResponse from '@/components/Custom/skeleton';


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


const DocResult = ({ response,  loading }) => {
  const [copied, setCopied] = useState(false);
  const [FileToResult, setFileToResult] = useState(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const Response = response;
    const workbook = jsonToExcel(Array.isArray(Response) ? Response : [Response]);
    downloadExcel(workbook, 'export.xlsx');
  };

  const Response = response;
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

  return (
    <div className="max-w-[450px] w-[450px] 2xl:max-w-[800px] 2xl:w-full min-w-[450px] bg-white h-screen z-50 right-0 shadow-lg">
      <h3 className=' text-lg font-semibold font-Rubik  ml-2 py-2'>Document Response</h3>
      <Tabs defaultValue="JSON" className=''>
        <TabsList className="flex justify-start gap-3 bg-white border-b ">
          <TabsTrigger className="text-xs font-medium ml-1" value="JSON">JSON</TabsTrigger>
          <TabsTrigger className="text-xs font-medium" value="FINAL RESPONSE">Key-Pair </TabsTrigger>
          <TabsTrigger className="text-xs font-medium " value="EXCEL">EXCEL</TabsTrigger>
        </TabsList>
        

        <TabsContent value="JSON" >
          <div className="text-sm px-2 max-w-[450px] 2xl:max-w-full 2xl:w-full mx-auto  shadow-lg rounded-lg  pb-32 overflow-auto ">              
          {loading ?
              <SkeletonResponse /> :
              <div>
                <CopyToClipboard text={JSON.stringify(Response, null, 2)} onCopy={handleCopy}>
                  <button className="text-xs bg-blue-400 text-white font-bold rounded-sm h-fit w-fit py-2 px-3 mb-3">
                    {copied ? 'Copied!' : 'Copy JSON'}
                  </button>
                </CopyToClipboard>
                <button
                  onClick={handleJsonDownload}
                  className="text-xs bg-green-400 text-white font-bold rounded-sm h-fit w-fit py-2 px-3 mb-3 ml-2"
                >
                  Download JSON
                </button>
                <div className='mb-[50px]'>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify(Response, null, 2)}
                  </pre>

                </div>
            </div>
          }
          </div>
        </TabsContent>

        <TabsContent value="FINAL RESPONSE" className="!h-full !min-h-full">
          <div className="text-sm pl-4 pr-1 max-w-[450px] 2xl:max-w-full 2xl:w-full mx-auto bg-white shadow-lg rounded-lg  pb-32 overflow-auto  h-full max-h-[300px]">
            {/* <div className='flex items-center justify-between gap-3 text-gray-900'>
              <h2 className="text-lg font-semibold font-Rubik">Fields</h2>
            </div> */}
            {loading ?
              <SkeletonResponse /> :
              <div className='mb-[50px]'>
                <ResponseFormat data={Response} />
              </div>
            }
          </div>
        </TabsContent>


        <TabsContent  value="EXCEL">
          <div className="text-sm px-4 max-w-[450px] 2xl:max-w-full 2xl:w-full mx-auto bg-white shadow-lg rounded-lg max-h-[500px] overflow-auto pb-2">
            <Button className="text-xs bg-green-400 text-white font-bold rounded-sm h-fit w-fit py-2 px-3 mb-3 " onClick={handleExport}>
              Download Excel
            </Button>
            <DataTable headers={headers} rows={rows} />
          </div>
        </TabsContent>
      </Tabs>

      <div className='w-full flex text-xs items-center h-[60px] border-t border-gray-200 bg-gray-50 shadow-inner bottom-0 justify-evenly right-0 pr-2'>
        <Button className="bg-green-700 flex items-center gap-2 text-xs shadow-xl">
          <Check size={15} /> Approve
        </Button>
        <Button className="bg-yellow-500 flex items-center gap-2 text-xs shadow-xl">
          <MdReviews size={15} /> Review
        </Button>
        <Button className="bg-blue-500 flex items-center gap-2 text-xs shadow-xl" onClick={handleExport}>
          <BiExport size={15} /> Export
        </Button>
      </div>
    </div>
  );
};

export default DocResult;