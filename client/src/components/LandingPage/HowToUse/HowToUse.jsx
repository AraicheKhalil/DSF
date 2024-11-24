import SectionTitle from '@/components/SectionTitle';
import React from 'react';

export default function HowToUse() {
  const steps = [
    {
      title: "1. Preparing Your Document",
      content: [
        { bold: "Ensure Good Lighting:", text: "Place your document in a well-lit area to avoid shadows and glare." },
        { bold: "Flat Surface:", text: "Lay your document flat on a solid surface. The entire document needs to be visible, not curled nor folded." },
        { bold: "Clean Document:", text: "Ensure that the text on the document is clear and legible." }
      ]
    },
    {
      title: "2. Capturing the Image",
      content: [
        { bold: "High-Resolution Camera:", text: "Use a camera with a high resolution so the image is not blurry. Smartphone cameras generally suffice." },
        { bold: "Frame the Document Properly:", text: "The entire document has to fit within the frame. Please avoid cutting off any part of the document, especially critical text areas." },
        { bold: "Crop the Image:", text: "After capturing the photo, crop the image to remove any unnecessary background. Ensure the document's edges are aligned with the frame edges." }
      ]
    },
    {
      title: "3. Reviewing the Extraction",
      content: [
        { bold: "Verify Accuracy:", text: "Check that all details, such as company name, invoice details, recipient information, and item descriptions, are correctly extracted." },
        { bold: "Edit if Necessary:", text: "If any information is incorrect, manually edit the extracted text to ensure accuracy." }
      ]
    },
    {
      title: "4. Tips for Best Results",
      content: [
        { bold: "High Contrast:", text: "Ensure there is a high contrast between the text and the background of the document." },
        { bold: "Straight Alignment:", text: "Keep the document aligned straight within the frame to prevent skewed text." },
        { bold: "Avoid Overlapping:", text: "Ensure no other objects overlap the document in the photo." },
        { bold: "Multiple Photos:", text: "For lengthy documents, take multiple photos ensuring overlap between the sections." }
      ]
    }
  ];

  return (
    <>
      <div className="container px-4 lg:px-20">
        <SectionTitle
          badge={"How to Use The App"}
          titleSection={"How to Use the SmartDoc Web App"}
          description={"Welcome to SmartDoc's Quick Playground! This guide will help you make the most out of our AI-powered OCR tool by ensuring you upload good-quality photos or scans of your documents. Remember, the better the quality of your uploads, the better the OCR and extraction results."}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-20 mb-10 p-5">
          {steps.map((step, index) => (
            <div key={index} className="border-[#4f4f52] border-2 p-6 rounded-xl  ">
              <h3 className="text-xl font-bold text-[#28282B] mb-4">{step.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                {step.content.map((item, idx) => (
                  <li key={idx} className="leading-relaxed text-[#28282B]">
                    <strong className='mr-1.5 text-[#28282B]'>{item.bold}</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
