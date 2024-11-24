import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, FolderOpen, File } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Checkbox } from '@/components/ui/checkbox';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { AiFillFile, AiFillFolder } from 'react-icons/ai';

// Expanded sample data
const sampleData = [
  { id: 1 ,createdBy: 'John Doe', DocType: "Invoice", theOrigineType: "file", DocumentName: "Pharmacy Bill", status: "approved", LastModified: "2024-06-15" },
  { id: 2 ,createdBy: 'Jane Smith', DocType: "Folder", theOrigineType: "folder", DocumentName: "Project Docs", status: "revision", LastModified: "2024-05-12" },
  { id: 3 ,createdBy: 'Sam Brown', DocType: "Folder", theOrigineType: "folder", DocumentName: "HR Files", status: "pending", LastModified: "2024-04-18" },
  { id: 4 ,createdBy: 'Lisa White', DocType: "Purchase Requisition", theOrigineType: "file", DocumentName: "Office Supplies Requisition", status: "requisition", LastModified: "2024-06-01" },
  { id: 5 ,createdBy: 'Tom Clark', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Vendor Purchase Order", status: "approved", LastModified: "2024-06-10" },
  { id: 6 ,createdBy: 'Sara Hall', DocType: "Docs", theOrigineType: "file", DocumentName: "Meeting Minutes", status: "pending", LastModified: "2024-06-20" },
  { id: 7 ,createdBy: 'Paul Adams', DocType: "Report", theOrigineType: "file", DocumentName: "Monthly Sales Report", status: "approved", LastModified: "2024-06-05" },
  { id: 8 ,createdBy: 'Mary Johnson', DocType: "Docs", theOrigineType: "file", DocumentName: "Project Plan", status: "revision", LastModified: "2024-06-14" },
  { id: 9 ,createdBy: 'James Lee', DocType: "Docs", theOrigineType: "file", DocumentName: "Budget Report", status: "approved", LastModified: "2024-05-30" },
  { id: 10, createdBy: 'Linda Taylor', DocType: "Purchase Requisition", theOrigineType: "file", DocumentName: "IT Equipment Requisition", status: "requisition", LastModified: "2024-06-11" },
  { id: 11, createdBy: 'Gary Wilson', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Marketing Supplies Order", status: "pending", LastModified: "2024-06-08" },
  { id: 12, createdBy: 'Emma Brown', DocType: "Docs", theOrigineType: "file", DocumentName: "Training Manual", status: "approved", LastModified: "2024-06-22" },
  { id: 14, createdBy: 'Daniel Harris', DocType: "Folder", theOrigineType: "folder", DocumentName: "Client Contracts", status: "revision", LastModified: "2024-05-15" },
  { id: 15, createdBy: 'Sophie Turner', DocType: "Docs", theOrigineType: "file", DocumentName: "Employee Handbook", status: "pending", LastModified: "2024-06-13" },
  { id: 16, createdBy: 'Ethan Johnson', DocType: "Invoice", theOrigineType: "file", DocumentName: "Utility Bill", status: "approved", LastModified: "2024-06-09" },
  { id: 17, createdBy: 'Olivia Martin', DocType: "Invoice", theOrigineType: "file", DocumentName: "Supplier Invoice", status: "pending", LastModified: "2024-06-07" },
  { id: 18, createdBy: 'Lucas Lee', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Office Furniture Order", status: "rejected", LastModified: "2024-06-03" },
  { id: 19, createdBy: 'Mia Lewis', DocType: "Docs", theOrigineType: "file", DocumentName: "Performance Report", status: "approved", LastModified: "2024-06-06" },
  { id: 20, createdBy: 'Noah Walker', DocType: "Folder", theOrigineType: "folder", DocumentName: "Archived Invoices", status: "revision", LastModified: "2024-04-25" },
  { id: 21, createdBy: 'Chloe Hall', DocType: "Folder", theOrigineType: "folder", DocumentName: "Legal Documents", status: "approved", LastModified: "2024-05-01" },
  { id: 22, createdBy: 'Liam Young', DocType: "Folder", theOrigineType: "folder", DocumentName: "Financial Records", status: "pending", LastModified: "2024-05-20" },
  { id: 23, createdBy: 'Isabella King', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Stationery Order", status: "approved", LastModified: "2024-06-02" },
  { id: 24, createdBy: 'Mason Wright', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "IT Services Order", status: "rejected", LastModified: "2024-06-04" },
  { id: 25, createdBy: 'Emily Scott', DocType: "Folder", theOrigineType: "folder", DocumentName: "Project Archives", status: "revision", LastModified: "2024-05-10" },
  { id: 26, createdBy: 'Jacob Green', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Software Purchase Order", status: "approved", LastModified: "2024-06-18" },
  { id: 27, createdBy: 'Charlotte Baker', DocType: "Docs", theOrigineType: "file", DocumentName: "Compliance Report", status: "approved", LastModified: "2024-06-12" },
  { id: 28, createdBy: 'Benjamin Hall', DocType: "Invoice", theOrigineType: "file", DocumentName: "Consulting Fees", status: "pending", LastModified: "2024-06-16" },
  { id: 29, createdBy: 'Amelia Lopez', DocType: "Invoice", theOrigineType: "file", DocumentName: "Medical Supplies Invoice", status: "approved", LastModified: "2024-06-19" },
  { id: 30, createdBy: 'William Hill', DocType: "Folder", theOrigineType: "folder", DocumentName: "Annual Reports", status: "revision", LastModified: "2024-05-05" },
  { id: 31, createdBy: 'Sophia Carter', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Hardware Order", status: "approved", LastModified: "2024-06-21" },
  { id: 32, createdBy: 'Liam Young', DocType: "Folder", theOrigineType: "folder", DocumentName: "Financial Records", status: "pending", LastModified: "2024-05-20" },
  { id: 33, createdBy: 'Isabella King', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Stationery Order", status: "approved", LastModified: "2024-06-02" },
  { id: 34, createdBy: 'Mason Wright', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "IT Services Order", status: "rejected", LastModified: "2024-06-04" },
  { id: 35, createdBy: 'Emily Scott', DocType: "Folder", theOrigineType: "folder", DocumentName: "Project Archives", status: "revision", LastModified: "2024-05-10" },
  { id: 36, createdBy: 'Jacob Green', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Software Purchase Order", status: "approved", LastModified: "2024-06-18" },
  { id: 37, createdBy: 'Charlotte Baker', DocType: "Docs", theOrigineType: "file", DocumentName: "Compliance Report", status: "approved", LastModified: "2024-06-12" },
  { id: 38, createdBy: 'Benjamin Hall', DocType: "Invoice", theOrigineType: "file", DocumentName: "Consulting Fees", status: "pending", LastModified: "2024-06-16" },
  { id: 39, createdBy: 'Amelia Lopez', DocType: "Invoice", theOrigineType: "file", DocumentName: "Medical Supplies Invoice", status: "approved", LastModified: "2024-06-19" },
  { id: 40, createdBy: 'William Hill', DocType: "Folder", theOrigineType: "folder", DocumentName: "Annual Reports", status: "revision", LastModified: "2024-05-05" },
  { id: 41, createdBy: 'Sophia Carter', DocType: "Purchase Order", theOrigineType: "file", DocumentName: "Hardware Order", status: "approved", LastModified: "2024-06-21" },
];






const TasksTable = () => {
  const [data, setData] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filterDoc,setFilterDoc] = useState("all")

  useEffect(() => {
    // Load data from an API or other source if needed
    // setData(loadedData);
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  let handleFilterDoc = (key) => {
    setData(sampleData)
    console.log(key)
    setFilterDoc(key);
    const ftd = data.filter(item => {
      return item.theOrigineType == key 
    })

    setData(ftd)
  }

  console.log(data)

  const FilterBar = () => {
    return (
      <div className="flex items-center justify-end  py-2 ]">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button
            variant="outline"
            className="rounded-r-none border-r-0 px-3 bg-muted text-xs"
          >
            All
          </Button>
          <Button
            variant="outline"
            className="rounded-none border-x px-4 text-xs"
            onClick={() => handleFilterDoc("folder")}
          >
            Folder <FolderOpen size={14} className='ml-1.5 ' />
          </Button>
          <Button
            variant="outline"
            className="rounded-l-none border-l-0 px-4 text-xs"
            onClick={() => handleFilterDoc("file")}
          >
            File <File size={14} className='ml-1.5 ' />
          </Button>
        </div>
      </div>
    )
  }

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    console.log(sortableItems)
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);


  const renderTableRows = () => {
    return currentItems.map((item) => (
      <TableRow key={item.id}>
        <TableCell className=" ">
          <Checkbox className="border-gray-400" />
        </TableCell>
        <TableCell className="font-medium text-blue-700">{item.DocumentName}</TableCell>
        <TableCell className="flex items-center gap-1">{item.theOrigineType == "folder" ? <AiFillFolder className='text-blue-600 text-xl' /> : <AiFillFile className='text-yellow-400 text-xl' />}{item.DocType}</TableCell>
        <TableCell className="py-0" >
          <div className={`py-1 px-3 w-fit rounded-lg font-medium border-2 ${item.status === "pending" && "text-yellow-500 bg-yellow-100 border-yellow-500"} ${item.status === "approved" && "text-green-500 bg-green-100 border-green-500"} ${item.status === "revision" && "text-orange-500 bg-orange-100 border-orange-500"} ${item.status === "requisition" && "text-blue-500 bg-blue-100 border-blue-500"} ${item.status === "rejected" && "text-red-500 bg-red-100 border-red-500"}` }>
            {item.status}
          </div>
        </TableCell>
        <TableCell>{item.createdBy}</TableCell>
        <TableCell>{item.LastModified}</TableCell>
        <TableCell>
          <DropdownMenu >
            <DropdownMenuTrigger className="p-0 m-0 px-1 hover:bg-none " asChild>
              <Button variant="ghost" className="w-fit h-fit m-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4 m-0"  />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="m-0">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>edit</DropdownMenuItem>
              <DropdownMenuItem>delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>

      </TableRow>
    ));
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderPageNumbers = () => {
    let pageNumbers = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // pageNumbers = [1, 2, 3, 4, '...'];
        pageNumbers = [1, 2, 3,4, '...'];
      } else if (currentPage >= totalPages - 2) {
        pageNumbers = ['...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pageNumbers = ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
      }
    }

    return pageNumbers.map((number, index) => (
        <PaginationItem
          key={index}
          className={` ${
            currentPage === number ? 'bg-blue-500 rounded-lg text-white' : ''
          } ${number === '...' ? 'cursor-default' : 'cursor-pointer'}`}
          onClick={() => number !== '...' && handleChangePage(number)}
          disabled={number === '...'}
        >
          <PaginationLink className={"hover:bg-blue-500 hover:text-white"}  >
                {number}
              </PaginationLink>
        </PaginationItem>
    ));
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <FilterBar />
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox  className="border-gray-400" />
            </TableHead>
            <TableHead className="flex items-center">
              Names{" "}
              <button
                onClick={() => handleSort("DocumentName")}
                className="ml-2 w-fit h-fit"
              >
                {sortConfig.key === "DocumentName" &&
                sortConfig.direction === "ascending" ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20}/>
                )}
              </button>
            </TableHead>
            <TableHead>All Types</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CreatedBy</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>edit</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {renderTableRows()}
        </TableBody>
      </Table>

      <Pagination className={"mt-10 px-1"}>
        <PaginationContent className="">
          <PaginationItem
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            <PaginationPrevious />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem
            className=" cursor-pointer"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TasksTable;
