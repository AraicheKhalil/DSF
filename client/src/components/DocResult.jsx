import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from 'lucide-react';
import { MdReviews } from 'react-icons/md';
import { BiExport } from 'react-icons/bi';
import SkeletonResponse from '@/components/Custom/skeleton';
import DataTable from '@/components/DataTable';
import ResponseFormat from '@/components/ExtractTabs/ResponseFormat';
import './SmartDoc.css'
import { downloadExcel, flattenObject, jsonToExcel, jsonToTableData } from './SmartDoc/SmartDocFlattenResponses';


const DocResult = ({ activeFile, extractionResults ,loading }) => {
  const [copied, setCopied] = useState(false);


  extractionResults = extractionResults.filter(item => {
    return item.id === activeFile?.id && item
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
    <div className=" flex flex-col w-full bg-white h-full shadow-lg py-2 pb-0 max-h-screen  ">
      <h3 className="  text-lg font-semibold font-Exo-2  ml-2 mb-2 ">
        Document Response
      </h3>
      <Tabs defaultValue="JSON" className="max-h-full h-full  ">
        <TabsList className="gap-4 bg-none w-full justify-start mx-2">
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
          <div className=" text-sm px-2 w-full bg-white h- div-tab ">              
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
              <div className=" mt-3 ">
                <pre className="bg-gray-100 p-4 rounded overflow-auto div-tab ">
                  {JSON.stringify(Response, null, 2)}
                </pre>
              </div>
            </div>
          )}
          </div>
        </TabsContent>

        <TabsContent value="FINAL RESPONSE" className=" ">
          <div className=" text-sm px-2 w-full bg-white  div-tab overflow-auto ">
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
            <Button className="text-xs px-3 py-2.5 h-fit mb-2 ml-2" onClick={handleExport} >Download Excel</Button>
            <DataTable headers={headers} rows={rows} />
          </div>
        </TabsContent>
      </Tabs>

      <div className=" p-2.5 w-full flex text-xs items-center  border-t border-gray-200 bg-gray-50 shadow-inner  justify-evenly ">
        <Button className="bg-green-700 flex items-center gap-2 text-xs shadow-xl">
          <Check size={15} /> Approve
        </Button>
        <Button className="bg-yellow-500 flex items-center gap-2 text-xs shadow-xl">
          <MdReviews size={15} /> Review
        </Button>
        <Button
          className="bg-blue-500 flex items-center gap-2 text-xs shadow-xl"
          onClick={handleExport}
        >
          <BiExport size={15} /> Export
        </Button>
      </div>
    </div>
  );
};

export default DocResult;