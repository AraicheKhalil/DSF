

// import React, { useState } from "react";
// import { formatDocument } from "../../Utils/ResponseFormatter";
// import { Check } from "lucide-react";
// import { Button } from "../ui/button";

// const ResponseFormat = ({ data }) => {
//   const [formattedData, setFormatedData] = useState(formatDocument(data));
//   const [editableData, setEditableData] = useState(parseDocumentData(formattedData));
//   const [editMode, setEditMode] = useState(null);
//   const [newValue, setNewValue] = useState('');
//   const [buttonText, setButtonText] = useState("Copy Text");


//   function parseDocumentData(dataString) {
//     const result = {};
//     const lines = dataString.split('\n').map(line => line.trim()).filter(line => line);

//     let currentKey = '';
//     let currentIndex = 0;
//     const keyCount = {};

//     lines.forEach(line => {
//       if (line.includes(':')) {
//         const [key, ...valueParts] = line.split(':');
//         const value = valueParts.join(':').trim();

//         if (key === 'description' || key === 'quantity' || key === 'price') {
//           const indexedKey = `${key}_${currentIndex}`;
//           result[indexedKey] = value || '';
//         } else {
//           currentKey = key.trim();

//           if (!keyCount[currentKey]) {
//             keyCount[currentKey] = 0;
//           }
//           keyCount[currentKey]++;

//           if (keyCount[currentKey] > 1) {
//             currentKey = `${currentKey}_${keyCount[currentKey]}`;
//           }

//           result[currentKey] = value || '';
//           if (currentKey === 'items') {
//             currentIndex++;
//           }
//         }
//       } else {
//         result[currentKey] += ` ${line.trim()}`;
//       }
//     });

//     return result;
//   }

//   const handleCopy = () => {
//     // Convert object to text format

//     const textToCopy = Object.entries(editableData)
//       .map(([key, value]) => `${key}: ${value}`)
//       .join('\n');

//     // Copy text to clipboard
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       // Change button text to "Copied!"
//       setButtonText("Copied!");
      
//       // Revert button text back to "Copy Text" after 2 seconds
//       setTimeout(() => {
//         setButtonText("Copy Text");
//       }, 2000);
//     }).catch((err) => {
//       console.error('Failed to copy: ', err);
//     });
//   };

//   const handleValueClick = (key) => {
//     setEditMode(key);
//     setNewValue(editableData[key]);
//   };

//   const handleInputChange = (e) => {
//     setNewValue(e.target.value);
//   };

//   const handleBlur = (key) => {
//     setEditableData({ ...editableData, [key]: newValue });
//     setEditMode(null);
//   };

//   const handleDownloadJSON = () => {
//     const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(editableData, null, 2))}`;
//     const link = document.createElement('a');
//     link.href = jsonString;
//     link.download = 'editableData.json';
//     link.click();
//   };

//   return (
//     <>
//       {editableData ? (
//         <div className="">
//           <Button
//             onClick={handleCopy}
//             className="text-xs px-3 py-2.5 h-fit "
//           >
//             {buttonText}
//           </Button>
//           {Object.entries(editableData).map(([key, value]) => (
//             <div key={key} className="flex gap-2 flex-nowrap text-sm font-Rubik my-3 justify-between mr-1">
//               <div className='min-w-[150px]'>
//                 <div className="text-gray-500">{key.replace(/_/g, ' ')}</div>
//               </div>
//               <div className='full w-full max-w-[200px]'>
//                 {editMode === key ? (
//                   <input
//                     type="text"
//                     value={newValue}
//                     onChange={handleInputChange}
//                     onBlur={() => handleBlur(key)}
//                     autoFocus
//                     className="w-full border rounded px-1"
//                   />
//                 ) : (
//                   <div className='line-clamp-2' onClick={() => handleValueClick(key)}>{value}</div>
//                 )}
//               </div>
//               <div className='flex items-center'>
//                 <Check size={18} className='border border-green-700 text-green-800 rounded-full p-1' />
//               </div>
//             </div>
//           ))}
          
//         </div>
//       ) : (
//         <h1>No formatted data</h1>
//       )}
//     </>
//   );
// };

// export default ResponseFormat;















// 'use client'

// import React, { useState, useRef, useEffect } from "react"
// import { Check } from "lucide-react"
// import { Button } from "@/components/ui/button"

// // Assuming these functions are defined elsewhere
// import { formatDocument } from "../../Utils/ResponseFormatter"

// export default function ResponseFormat({ data = {} }) {
//   const [formattedData, setFormattedData] = useState(formatDocument(data))
//   const [editableData, setEditableData] = useState(() => {
//     const parsed = parseDocumentData(formattedData)
//     return Object.entries(parsed).map(([key, value]) => ({ key, value }))
//   })
//   const [editMode, setEditMode] = useState(null)
//   const [newKey, setNewKey] = useState('')
//   const [newValue, setNewValue] = useState('')
//   const [buttonText, setButtonText] = useState("Copy Text")
//   const inputRef = useRef(null)

//   useEffect(() => {
//     if (editMode && inputRef.current) {
//       inputRef.current.focus()
//     }
//   }, [editMode])

//   function parseDocumentData(dataString) {
//     const result = {}
//     const lines = dataString.split('\n').map(line => line.trim()).filter(line => line)

//     let currentKey = ''
//     let currentIndex = 0
//     const keyCount = {}

//     lines.forEach(line => {
//       if (line.includes(':')) {
//         const [key, ...valueParts] = line.split(':')
//         const value = valueParts.join(':').trim()

//         if (key === 'description' || key === 'quantity' || key === 'price') {
//           const indexedKey = `${key}_${currentIndex}`
//           result[indexedKey] = value || ''
//         } else {
//           currentKey = key.trim()

//           if (!keyCount[currentKey]) {
//             keyCount[currentKey] = 0
//           }
//           keyCount[currentKey]++

//           if (keyCount[currentKey] > 1) {
//             currentKey = `${currentKey}_${keyCount[currentKey]}`
//           }

//           result[currentKey] = value || ''
//           if (currentKey === 'items') {
//             currentIndex++
//           }
//         }
//       } else {
//         result[currentKey] += ` ${line.trim()}`
//       }
//     })

//     return result
//   }

//   const handleCopy = () => {
//     const textToCopy = editableData
//       .map(({ key, value }) => `${key}: ${value}`)
//       .join('\n')

//     navigator.clipboard.writeText(textToCopy).then(() => {
//       setButtonText("Copied!")
//       setTimeout(() => {
//         setButtonText("Copy Text")
//       }, 2000)
//     }).catch((err) => {
//       console.error('Failed to copy: ', err)
//     })
//   }

//   const handleEdit = (index, isKeyEdit) => {
//     setEditMode({ index, isKeyEdit })
//     setNewKey(editableData[index].key)
//     setNewValue(editableData[index].value)
//   }

//   const handleChange = (e) => {
//     if (editMode.isKeyEdit) {
//       setNewKey(e.target.value)
//     } else {
//       setNewValue(e.target.value)
//     }
//   }

//   const handleSave = () => {
//     if (newKey.trim() && newValue.trim()) {
//       setEditableData(prevData => 
//         prevData.map((item, index) => 
//           index === editMode.index ? { key: newKey, value: newValue } : item
//         )
//       )
//     }
//     setEditMode(null)
//   }

//   const handleDownloadJSON = () => {
//     const jsonData = Object.fromEntries(editableData.map(({ key, value }) => [key, value]))
//     const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(jsonData, null, 2))}`
//     const link = document.createElement('a')
//     link.href = jsonString
//     link.download = 'editableData.json'
//     link.click()
//   }

//   return (
//     <div className="px-1">
//       <div className="flex justify-start gap-2 mb-4">
//         <Button onClick={handleCopy} className="text-xs px-3 py-2.5 h-fit ">
//           {buttonText}
//         </Button>
//         <Button onClick={handleDownloadJSON} className="text-xs px-3 py-2.5 h-fit">
//           Download JSON
//         </Button>
//       </div>
//       {editableData.map(({ key, value }, index) => (
//         <div key={index} className="flex gap-2 flex-nowrap text-sm font-Rubik my-3 justify-between mr-1 items-center">
//           <div className="w-1/3 min-w-[150px]">
//             {editMode && editMode.index === index && editMode.isKeyEdit ? (
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={newKey}
//                 onChange={handleChange}
//                 onBlur={handleSave}
//                 className="w-full border rounded px-1"
//                 required
//               />
//             ) : (
//               <div 
//                 className="text-gray-500 cursor-pointer" 
//                 onClick={() => handleEdit(index, true)}
//               >
//                 {key.replace(/_/g, ' ')}
//               </div>
//             )}
//           </div>
//           <div className="w-1/3 max-w-[200px]">
//             {editMode && editMode.index === index && !editMode.isKeyEdit ? (
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={newValue}
//                 onChange={handleChange}
//                 onBlur={handleSave}
//                 className="w-full border rounded px-1"
//                 required
//               />
//             ) : (
//               <div 
//                 className="line-clamp-2 cursor-pointer" 
//                 onClick={() => handleEdit(index, false)}
//               >
//                 {value}
//               </div>
//             )}
//           </div>
//           <div className="flex items-center">
//             <Check size={18} className='border border-green-700 text-green-800 rounded-full p-1' />
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }









'use client'

import { useState, useRef, useEffect } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Assuming these functions are defined elsewhere
import { formatDocument } from "../../Utils/ResponseFormatter"

export default function ResponseFormat({ data = {} }) {
  const [formattedData, setFormattedData] = useState(formatDocument(data))
  const [editableData, setEditableData] = useState(() => {
    const parsed = parseDocumentData(formattedData)
    return Object.entries(parsed).map(([key, value]) => ({ key, value }))
  })
  const [editMode, setEditMode] = useState(null)
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [buttonText, setButtonText] = useState("Copy Text")
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editMode])

  function parseDocumentData(dataString) {
    const result = {}
    const lines = dataString.split('\n').map(line => line.trim()).filter(line => line)

    let currentKey = ''
    let currentIndex = 0
    const keyCount = {}

    lines.forEach(line => {
      if (line.includes(':')) {
        const [key, ...valueParts] = line.split(':')
        const value = valueParts.join(':').trim()

        if (key === 'description' || key === 'quantity' || key === 'price') {
          const indexedKey = `${key}_${currentIndex}`
          result[indexedKey] = value || ''
        } else {
          currentKey = key.trim()

          if (!keyCount[currentKey]) {
            keyCount[currentKey] = 0
          }
          keyCount[currentKey]++

          if (keyCount[currentKey] > 1) {
            currentKey = `${currentKey}_${keyCount[currentKey]}`
          }

          result[currentKey] = value || ''
          if (currentKey === 'items') {
            currentIndex++
          }
        }
      } else {
        result[currentKey] += ` ${line.trim()}`
      }
    })

    return result
  }

  const handleCopy = () => {
    const textToCopy = editableData
      .map(({ key, value }) => `${key}: ${value}`)
      .join('\n')

    navigator.clipboard.writeText(textToCopy).then(() => {
      setButtonText("Copied!")
      setTimeout(() => {
        setButtonText("Copy Text")
      }, 2000)
    }).catch((err) => {
      console.error('Failed to copy: ', err)
    })
  }

  const handleEdit = (index, isKeyEdit) => {
    setEditMode({ index, isKeyEdit })
    setNewKey(editableData[index].key)
    setNewValue(editableData[index].value)
  }

  const handleChange = (e) => {
    if (editMode.isKeyEdit) {
      setNewKey(e.target.value)
    } else {
      setNewValue(e.target.value)
    }
  }

  const handleSave = () => {
    if (newKey.trim() && newValue.trim()) {
      setEditableData(prevData => 
        prevData.map((item, index) => 
          index === editMode.index ? { key: newKey, value: newValue } : item
        )
      )
    }
    setEditMode(null)
  }

  const handleDelete = (index) => {
    setEditableData(prevData => prevData.filter((_, i) => i !== index))
  }

  const handleDownloadJSON = () => {
    const jsonData = Object.fromEntries(editableData.map(({ key, value }) => [key, value]))
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(jsonData, null, 2))}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = 'editableData.json'
    link.click()
  }

  return (
    <div className="p-1">
      <div className="flex justify-start gap-2 mb-4">
        <Button onClick={handleCopy} className="text-xs px-3 py-2.5 h-fit">
          {buttonText}
        </Button>
        <Button onClick={handleDownloadJSON} className="text-xs px-3 py-2.5 h-fit">
          Download JSON
        </Button>
      </div>
      {editableData.map(({ key, value }, index) => (
        <div 
          key={index} 
          className="flex gap-2 flex-nowrap text-sm font-Rubik my-3 justify-between mr-1 items-center"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="w-[45%]">
            {editMode && editMode.index === index && editMode.isKeyEdit ? (
              <input
                ref={inputRef}
                type="text"
                value={newKey}
                onChange={handleChange}
                onBlur={handleSave}
                className="w-full border rounded px-1"
                required
              />
            ) : (
              <div 
                className="text-gray-500 cursor-pointer text-wrap" 
                onClick={() => handleEdit(index, true)}
              >
                {key.replace(/_/g, ' ')}
              </div>
            )}
          </div>
          <div className="w-[50%]">
            {editMode && editMode.index === index && !editMode.isKeyEdit ? (
              <input
                ref={inputRef}
                type="text"
                value={newValue}
                onChange={handleChange}
                onBlur={handleSave}
                className="w-full border rounded px-1"
                required
              />
            ) : (
              <div 
                className=" cursor-pointer" 
                onClick={() => handleEdit(index, false)}
              >
                {value}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {hoveredIndex === index ? (
              <Button
                onClick={() => handleDelete(index)}
                size="sm"
                variant="ghost"
                className="p-0 h-fit hover:bg-red-100 transition-colors duration-200"
              >
                <X size={18} className="text-red-600 border border-red-700 rounded-full p-1" />
              </Button>
            ) : (
              <Check size={18} className='border border-green-700 text-green-800 rounded-full p-1' />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}