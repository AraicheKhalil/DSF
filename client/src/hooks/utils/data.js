import { FileText, Brain, Wrench, ChevronLeft, ChevronRight, SkipForward, Mail, Code, FileUp } from 'lucide-react'

export const steps = [
  { 
    name: 'Smart Doc', 
    backendKey: 'SmartDocProcessors',
    icon: FileText,
    options: [
      { name: 'document', description: 'Pre-built extractor', link: 'smart-doc', type: 'process-document' },
      { name: 'invoices', description: 'Pre-built extractor', link: 'smart-doc', type: 'process-invoices' },
      { name: 'Bank Statements', description: 'Pre-built extractor', link: 'smart-doc', type: 'process-bank-statements' },
      { name: 'Legal Foms', description: 'Pre-built extractor', link: 'smart-doc', type: 'process-legalForms' },
      { name: "ID's", description: 'Pre-built extractor',  link: 'smart-doc', type: 'process-ids' },
      { name: 'passports', description: 'Pre-built extractor',  link: 'smart-doc', type: 'process-passports' },
      { name: 'receipts', description: 'Pre-built extractor', link: 'smart-doc', type: 'process-receipts' },
      { name: 'Bills of Landing', description: 'Pre-built extractor', link: 'smart-doc', type: 'process-bol' } ,
      { name: 'DUN', description: 'Pre-built extractor', link: 'smart-doc', type: 'process-dun' } 

    ]
  },
  { 
    name: 'Gen AI', 
    backendKey: 'GenAi',
    icon: Brain,
    options: [
      { name: 'Translating', description: 'AI-powered translation', link: 'gen_ai/translate-document-gemini' },
      { name: 'Proofreading', description: 'AI-assisted proofreading', link: 'gen_ai/dsf-proofread' },
      { name: 'Summarize', description: 'AI-powered Summarize', link: 'gen_ai/dsf-summarize-document' }
    ]
  },
  { 
    name: 'SmartDoc Tools', 
    backendKey: 'Conversions',
    icon: Wrench,
    options: [
      { name: 'PDF To Excel', description: 'Convert PDF to Excel', link: 'tools/pdf-to-excel' },
      { name: 'PDF To Image', description: 'Convert PDF to image', link: 'tools/pdf-to-image' },
      { name: 'HTML To PDF', description: 'Convert page to PDF', link: 'tools/html-to-pdf' },
      { name: 'Image To PDF', description: 'Convert image to PDF', link: 'tools/image-to-pdf' },
      { name: 'Excel To PDF', description: 'Convert Excel to PDF', link: 'tools/excel-to-pdf' },
      { name: 'PDF to Docx', description: 'Convert PDF to Word', link: 'tools/pdf-to-docx' },
      { name: 'Json To CSV', description: 'Convert JSON to CSV', link: 'tools/json-to-csv' },
      { name: 'Docx To PDF', description: 'Convert Word to PDF', link: 'tools/docx-to-pdf' },
      { name: 'Split PDF', description: 'Split PDF documents', link: 'tools/split-pdf' },
      { name: 'Merge PDF', description: 'Combine PDF files', link: 'tools/merge-pdfs' },
      { name: 'Merge PPTS', description: 'Merge PowerPoint to PDF', link: 'tools/merge-ppts' },
      { name: 'Enhance File', description: 'Improve PDF quality', link: 'tools/enhance-file' }
    ]
  },
  // {
  //   name: 'File Import',
  //   backendKey: 'ImportsMethods',
  //   icon: FileUp,
  //   options: [
  //     { name: 'Receive files via Email', description: 'Gmail, Outlook, etc.', icon: Mail, link: 'file-import/email' },
  //     { name: 'Integrate via API', description: 'Custom integration', icon: Code, link: 'file-import/api' },
  //     { name: 'Import Google Drive', description: 'Connect to Google Drive', icon: FileUp, link: 'file-import/google-drive' }
  //   ]
  // }
]


export const sectionConfig = {
  SmartDocProcessors: {
    name: 'Smart Doc',
    description: 'Intelligent document processing solutions',
    icon: FileText,
  },
  GenAi: {
    name: 'Gen AI',
    description: 'AI-powered document enhancement tools',
    icon: Brain,
  },
  Conversions: {
    name: 'SmartDoc Tools',
    description: 'Versatile document conversion and manipulation tools',
    icon: Wrench,
  },
  ImportsMethods: {
    name: 'File Import',
    description: 'Various methods to import your documents',
    icon: FileUp,
  },
}